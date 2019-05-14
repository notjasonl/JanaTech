const ipc = require('electron').ipcRenderer
const fs = require('graceful-fs')

document.getElementById('files').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt) {
    var files = evt.target.files;

    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li class="list-group-item"><strong>', f.name, '</strong></li>');
    }
    document.getElementById('list').innerHTML = '<ul class="list-group">' + output.join('') + '</ul>';
  }
