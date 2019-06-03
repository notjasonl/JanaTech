const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')
// const FileReader = require('filereader')
const fileType = require('file-type')
const path = require('path')
const fs = require('fs')
const ls = require('local-storage')

// This JS is intended to get the fields from all files in the local folder, and put them into local storage
// Should only be called once
// Utilizes the browser's local storage functionality to store persistant data

// const folderPath = '/Users/jasonliu/git/JanaTech/uploads'
const folderPath = 'C:/Users/dev/git/JanaTech/uploads'

let files = readFilesSync(folderPath)
// Use these to locate the fields afterwards
let docxIndices = []
let pdfIndices = []

pushToStorage(files)

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
  ls.set('docxIndices', docxIndices)
  ls.set('pdfIndices', pdfIndices)
}

// read all files in directory synchronously
function readFilesSync (dir) {
  const files = []
  fs.readdirSync(dir).forEach(filename => {
    files.push(fs.readFileSync(path.join(dir, filename)))
  })
  return files
}

function fieldsDocx (file, id) {
  mammoth.convertToHtml(file)
    .then(function (result) {
      let names = []
      let fields = result.value.split('<p>')
      fields.forEach(function (field) {
        if ((field.match(/_/g) || []).length > 7) {
          field = field.replace(/<[^>]*>/g, '')
          let words = field.split(/\b(\s)/)
          words = words.filter(v => v != '')
          // words = words.map(w => w.trim())
          let fieldNames = fieldSearch(words)
          fieldNames.forEach(function (element) {
            names.push(element)
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
