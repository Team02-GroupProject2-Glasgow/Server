const { Socket } = require('dgram')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const tebak_kata = [
  {
    id: 1,
    clue: ['kendaraan', 'roda empat', 'bensin', 'darat', 'supir'],
    answer: 'mobil'
  },
  {
    id: 2,
    clue: ['istirahat', 'capek', 'menunggu', 'perabotan', 'kaki empat'],
    answer: 'kursi'
  },
  {
    id: 3,
    clue: ['tipis', 'persegi panjang', 'ringan', 'permainan', 'joker'],
    answer: 'kartu'
  },
  {
    id: 4,
    clue: ['bulat', 'makanan', 'daging', 'sapi', 'ikan'],
    answer: 'bakso'
  },
  {
    id: 5,
    clue: ['penampilan', 'cowok', 'muka', 'ganteng', 'cewek juga bisa'],
    answer: 'cakep'
  }
]

io.on('connection', (socket) => {
    console.log('Socket.io client connected')
})

server.listen(3000, () => {
    console.log('Listening to port ' + 3000)
})