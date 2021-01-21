const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const user = []

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

    socket.emit('init', tebak_kata)

    socket.on('getName', function(payload){
        user.push({
            id: user.length + 1,
            name: payload,
            progress: 0
        })
    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT, () => {
    console.log('Listening to port ' + PORT)
})

