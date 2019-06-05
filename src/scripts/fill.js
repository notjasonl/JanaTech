// const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')
// const FileReader = require('filereader')
const fileType = require('file-type')
const path = require('path')
const fs = require('fs')
const ls = require('local-storage')

const folderPath = '/Users/jasonliu/git/JanaTech/uploads'
// const folderPath = 'C:/Users/dev/git/JanaTech/uploads'

// var fileList = document.getElementById('file-list')
// var confirm = document.getElementById('confirm')
// var folder = document.getElementById('user-select')

let files = readFilesSync(folderPath)

let docxIndices = []
let pdfIndices = []

pushToStorage(files)

setTimeout(() => {
  let fields = window.localStorage.getItem('1')
  console.log(fields)
})

// fillAll(folderPath)
// processData(ls.get('1'))

// docx and pdf are expected to be arrays of indices where those files are found
// directory is a file path pointing to the directory where files are uploaded
function fillAll (directory) {
  let files = readFilesSync(directory)
  for (let i = 0; i < files.length; i++) {
    if (fileType(files[i]) === undefined) {} else {
      if (fileType(files[i]).ext === 'docx') {
        let fields = []
        let data = window.localStorage.getItem('formData')
        console.log(data)
        setTimeout(() => { fields = window.localStorage.getItem(i.toString()) })
        fill(files[i], fields, data, true)
      } else if (fileType(files[i]).ext === 'pdf') {
        let fields = []
        setTimeout(() => { fields = window.localStorage.getItem(i.toString()) })
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

// this function should have a data parameter, removed for testing
function processData (fields) {
  let output = {}
  let data = window.localStorage.getItem('formData')
  console.log(data)
  console.log(fields)
  fields.forEach(function (field) {
    // Add key/value pairs for field and value to output
    output
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

// Puts in different array based on file extension
function pushToStorage (files) {
  for (let i = 0; i < files.length; i++) {
    if (fileType(files[i]) === undefined) {} else {
      if (fileType(files[i]).ext === 'docx') {
        docxIndices.push(i)
        fieldsDocx(files[i], i)
      } else if (fileType(files[i]).ext === 'pdf') {
        pdfIndices.push(i)
        // fieldsPdf(files[i], i)
      }
    }
  }
  // Setting to LocalStorage
  window.localStorage.setItem('docxIndices', docxIndices)
  window.localStorage.setItem('pdfIndices', pdfIndices)
}

// Converts to HTML
function fieldsDocx (file, id) {
  mammoth.convertToHtml(file)
    .then(function (result) {
      let names = []
      let fields = result.value.split('<p>')
      fields.forEach(function (field) {
        if ((field.match(/_/g) || []).length > 7) { // Looks for the __
          field = field.replace(/<[^>]*>/g, '')
          let words = field.split(/\b(\s)/)
          words = words.filter(v => v != '') // Trims empty strings
          // words = words.map(w => w.trim())
          let fieldNames = fieldSearch(words)
          fieldNames.forEach(function (element) {
            names.push(element) // Stores fields in an array
          })
        }
      })
      // console.log(names)
      ls.set(id, names)
    })
  // return fields
}

function fieldsPdf (file, id) {

}

// Pushes fields into an array
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
