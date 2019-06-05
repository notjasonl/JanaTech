// Test fucntion to convert docx to

var docxConverter = require('docx-pdf')
var numFiles = 0
const fs = require('fs')
inputFolder = '../../uploads'

fs.readdir(inputFolder, (err, files) => {
  console.log(err)
  files.forEach(file => {
    numFiles++
    console.log(file)
    var outputName = file.substring(0, file.indexOf('.')) + '.pdf'
    docxConverter(inputFolder + '/' + file, inputFolder + '/outputPDF/' + outputName, function (err, result) { // Need to change the output pdf so it doesn orride the saves
      if (err) {
        console.log(err)
      }
      console.log('result' + result)
    })
  })
})
