const fs = require('fs')
const cors = require("cors")
const { Socket } = require('dgram')
const express = require('express')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const { shuffleWord, getRandom } = require('./word')

let score = {
}

app.use(cors())

let data = fs.readFileSync('./wordlist.json', 'UTF-8')
let parse = JSON.parse(data)
let currentWord = ''
let shuffle = ''

io.on('connect', (socket) => {
  console.log('a user connected')
  socket.emit('init', score)
})

http.listen(3000, () => {
    console.log('listening on *:3000')
})