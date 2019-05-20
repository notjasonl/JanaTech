const ipc = require('electron').ipcRenderer
const mammoth = require('mammoth')

var folder = document.getElementById('user-select')
folder.onchange = function () {
  var files = folder.files

  var len = files.length

  var i
  for (i = 0; i < len; i += 1) {
    console.log(files[i])
  }
}
