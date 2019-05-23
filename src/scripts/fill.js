const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')
const FileReader = require('filereader')
const path = require('path')
const fs = require('fs')

const folderPath = '/Users/jasonliu/git/JanaTech/uploads'

var confirm = document.getElementById('confirm')
var folder = document.getElementById('user-select')

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

files = readFilesSync(folderPath)
console.log(files)

function readFilesSync(dir) {
  const files = []

  fs.readdirSync(dir).forEach(filename => {
    const name = path.parse(filename).name
    const ext = path.parse(filename).ext
    const filepath = path.resolve(dir, filename)
    const stat = fs.statSync(filepath)
    const isFile = stat.isFile()

    if (isFile) files.push({ filepath, name, ext, stat })
  });

  files.sort((a, b) => {
    return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
  });
  return files
}