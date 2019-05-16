const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const path = require('path')

const app = express()

app.use(bodyParser.json())

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  }
})

var upload = multer({ storage: storage }).array('form', 2)

app.use(express.static('src'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/pages/index.html'))
})

app.get('/new', function (req, res) {
  res.sendFile(path.join(__dirname, '/pages/new.html'))
})

app.get('/fill', function (req, res) {
  res.sendFile(path.join(__dirname, '/pages/fill.html'))
})

app.get('/tutorial', function (req, res) {
  res.sendFile(path.join(__dirname, '/pages/tutorial.html'))
})

app.post('/api/upload', function (req, res) {
  upload(req, res, function (err) {
  // console.log(req.body);
  // console.log(req.files);
    if (err) {
      return res.end('Error uploading file.')
      // return res.end(err);
    }
    res.end('File is uploaded')
  })
})

app.listen(3000, function () {
  console.log('Working on port 3000')
})
