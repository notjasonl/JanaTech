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
let allFieldNames = []
// let testNames = ['NameofFieldTrip', 'FieldTripSponsor/AccountManager', 'DateofFieldTrip', 'FieldTripAccountNumber', 'NameofSubstitute', 'SubstituteIDNumber', 'NameofStaffRequiringSubstitute']
let testData = ['testTrip', 'test test', '06/01/19', '123435', 'abcde', '123456', 'test']


files.forEach(function (file) {
  // console.log(Buffer.isBuffer(file))
  // console.log(fileType(file))
  if (fileType(file) === undefined) {} else {
    if (fileType(file).ext === 'docx') {
      processDocx(file)
      setTimeout(() => {
        console.log(allFieldNames)
      }, 1500)
      
      
    }
    else if (fileType(file).ext === 'pdf') {

    }
  }
})
// read all files in directory synchronously
function readFilesSync (dir) {
  const files = []
  fs.readdirSync(dir).forEach(filename => {
    files.push(fs.readFileSync(path.join(dir, filename)))
  })
  return files
}

// accepts data in order of field names
// should return 
function fillDocx (names, data) {

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
          let words = field.split(' ')
          words = words.filter(v => v !='')
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

function fillDocx (file, data) {

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
