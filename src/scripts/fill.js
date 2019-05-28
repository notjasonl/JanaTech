const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')
// const FileReader = require('filereader')
const fileType = require('file-type')
const path = require('path')
const fs = require('fs')

const folderPath = '/Users/jasonliu/git/JanaTech/uploads'
// const folderPath = 'C:/Users/dev/git/JanaTech/uploads'

var fileList = document.getElementById('file-list')
var confirm = document.getElementById('confirm')
var folder = document.getElementById('user-select')

let files = readFilesSync(folderPath)
// console.log(files)
let output = []

files.forEach(function (file) {
  console.log(Buffer.isBuffer(file))
  console.log(fileType(file))
  if (fileType(file) === undefined) {} else {
    if (fileType(file).ext === 'docx') {
      processDocx(file)
    }
    else if (fileType(file).ext === 'pdf') {

    }
  }
})

function readFilesSync (dir) {
  const files = []

  fs.readdirSync(dir).forEach(filename => {
    files.push(fs.readFileSync(path.join(dir, filename)))
  })
  return files
}

function processDocx (file) {
  mammoth.convertToHtml(file)
    .then(function (result) {
      let fields = result.value.split('<p>')
      fields.forEach(function (field) {
        if ((field.match(/_/g)||[]).length > 7) {
          let firstUnder = field.indexOf('_')
          
        }
      })
    })
}

function processPdf (file) {

}

function fieldSearch(html) {
  let chunks = html.split('<p>')
  // for (let chunk in chunks) {
  //   for ()
  // }
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
