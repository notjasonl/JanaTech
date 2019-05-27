const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')
const FileReader = require('filereader')
const path = require('path')
const fs = require('fs')

const folderPath = '/Users/jasonliu/git/JanaTech/uploads'

var fileList = document.getElementById('file-list')
var confirm = document.getElementById('confirm')
var folder = document.getElementById('user-select')

let files = readFilesSync(folderPath)
console.log(files)
let output = []

files.forEach(function (file) {
  if (file.ext === '') {
    
  } else {
    if (file.ext !== '.docx' || file.ext !== '.pdf') {

    } else {
      if (file.ext === '.docx') {
        processDocx(file)
      }
    }
  }
})

function readFilesSync (dir) {
  const files = []

  fs.readdirSync(dir).forEach(filename => {
    files.push(fs.readFile(path.join(dir, filename)))
  })
  return files
}

function processDocx (file) {
  mammoth.convertToHtml
}

function processPdf (file) {

}

// confirm.onclick = function () {
//   // let reader = new FileReader()
//   let files = folder.files
//   let fileList = []
//   console.log(files)
//   fileList = addFiles(files)
//   console.log(fileList)
//   // Array.prototype.forEach.call(files, function (file) {
//   //   console.log('hello')
//   //   var reader = new FileReader()
//   //   reader.onloadend = function () {
//   //     console.log(reader.result)
//   //     fileList.push(reader.result)
//   //   }
//   //   reader.readAsArrayBuffer(file)
//   // })
//   // processFiles(files)
//   // var i
//   // for (i = 0; i < len; i += 1) {
//   //   console.log(files[i])
//   // }
// }
