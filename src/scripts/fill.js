const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')
// const FileReader = require('filereader')
const fileType = require('file-type')
const path = require('path')
const fs = require('fs')
const ls = require('local-storage')

const folderPath = '/Users/jasonliu/git/JanaTech/uploads'
// const folderPath = 'C:/Users/dev/git/JanaTech/uploads'

var fileList = document.getElementById('file-list')
var confirm = document.getElementById('confirm')
var folder = document.getElementById('user-select')

let files = readFilesSync(folderPath)

// docx and pdf are expected to be arrays of indices where those files are found
// directory is a file path pointing to the directory where files are uploaded
function fillAll (directory) {
  let files = readFilesSync(directory)
  for (let i = 0; i < files.length; i++) {
    if (fileType(files[i]) === undefined) {} else {
      if (fileType(files[i]).ext === 'docx') {
        let fields = []
        setTimeout(() => { fields = ls.get(i.toString()) })
        fill(files[i], fields, )
      }
      else if (fileType(files[i]).ext === 'pdf') {
        let fields;
        setTimeout(() => { fields = ls.get(i.toString()) })
      }
    }
  }
}

// Fields and data should both be arrays of Strings
// File is expected to be a Buffer containing a .docx or a .pdf file
// isDocx is a boolean
// Should save the filled docx to /uploads
function fill (file, fields, data, isDocx) {

}

function processData (fields, data) {
  fields.forEach(function (field) {

  })
}

// read all files in directory synchronously
function readFilesSync (dir) {
  const files = []
  fs.readdirSync(dir).forEach(filename => {
    files.push(fs.readFileSync(path.join(dir, filename)))
  })
  return files
}

// called if the file is a .docx file
// returns list of field names
function processDocx (file) {
  mammoth.convertToHtml(file)
    .then(function (result) {
      let names = []
      let fields = result.value.split('<p>')
      fields.forEach(function (field) {
        if ((field.match(/_/g)||[]).length > 7) {
          field = field.replace(/<[^>]*>/g, '')
          let words = field.split(/\b(\s)/)
          words = words.filter(v => v !== '')
          // words = words.map(w => w.trim())
          let fieldNames = fieldSearch(words)
          fieldNames.forEach(function (element) {
            names.push(element)
          })
        }
      })
      // console.log(names)
      allFieldNames = names
    })
  // return fields
}

function processPdf (file) {

}

function searchChar (arr) {

}

function fieldSearch (words) {
  let fieldNames = []
  let nextStart = 0
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes('_')) {
      let fieldName = ''
      for (let j = nextStart; j < i; j++) {
        // console.log(words[j], j)
        fieldName += words[j]
      }
      fieldNames.push(fieldName)
      nextStart = i + 1
    }
  }
  return fieldNames
}
