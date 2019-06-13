// const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')
// const FileReader = require('filereader')
const fileType = require('file-type')
const path = require('path')
const fs = require('fs')
const htmlDocx = require('html-docx-js')
const FileSaver = require('file-saver')

// const folderPath = '/Users/jasonliu/git/JanaTech/uploads'
const folderPath = 'C:/Users/dev/git/JanaTech/uploads'
// const folderPath = '/home/jason/git/JanaTech/uploads'

// var fileList = document.getElementById('file-list')
// var confirm = document.getElementById('confirm')
// var folder = document.getElementById('user-select')

let files = readFilesSync(folderPath)
let filenames = fs.readdirSync(folderPath)
// console.log(filenames)

let docxIndices = []
let pdfIndices = []

let filledFile

fillAll(folderPath)

window.location.href = 'http://localhost:3000/finish'

// fillAll(folderPath)
// processData(ls.get('1'))

// docx and pdf are expected to be arrays of indices where those files are found
// directory is a file path pointing to the directory where files are uploaded
function fillAll (directory) {
  let files = readFilesSync(directory)
  for (let i = 0; i < files.length; i++) {
    if (fileType(files[i]) === undefined) {} else {
      if (fileType(files[i]).ext === 'docx') {
        // let fields
        // window.alert(JSON.stringify(data))
        setTimeout(() => {
          let fields = window.localStorage.getItem(i.toString())
          // console.log(fields)
          let data = JSON.parse(window.localStorage.getItem('formData'))
          // data = processData(fields, data)
          fill(files[i], fields, data, true, filenames[i])
        })
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
function fill (file, fields, data, isDocx, filename) {
  mammoth.convertToHtml(file)
    .then(function (result) {
      let html = result.value
      fields = fields.split(',')
      console.log(fields)
      fields.map(field => {
        let fieldIndex = html.indexOf(field)
        let fieldLength = field.length
        let underscore = ''

        for (let i = fieldIndex + fieldLength; i < fieldIndex + fieldLength + 100; i++) {
          // console.log(result.value[i])
          if (html[i + 1] === '_') {
            if (html[i] === '_') {
              underscore += '_'
            }
          } else {
            underscore += '_'
            break
          }
        }
        html = html.replace(underscore, data[field])
      })
      FileSaver.saveAs(htmlDocx.asBlob(html), filename)
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

function fieldsPdf (file, id) {

}