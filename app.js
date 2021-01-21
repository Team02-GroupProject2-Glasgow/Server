const { Socket } = require('dgram')
const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

let user = []

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
    // emit buat ngirim progres ngirim broadcast
    // jika ada event server nerima progres
    socket.on('getName', (payload) => {
      let data = {
        id: user.length + 1,
        name: payload,
        progress: 0
      }
      user.push(data)
      socket.emit('sendYou', data)
      io.emit('sendAllUser', user)
      socket.emit('init', tebak_kata) // buat ngirim daftar kata ke browser kita sndiri
    })

    socket.on('updateProgress', payload => {
      user.forEach( el => {
        if (el.id == payload.id) {
          el.progress = payload.progress
        }
      })
      function compare( a, b ) {
        if ( a.progress < b.progress ){
          return 1;
        }
        if ( a.progress > b.progress ){
          return -1;
        }
        return 0;
      }
      user.sort( compare );
      io.emit('sendAllUser', user)
    })

    socket.on('disconnect', () => {
      // let new_user = user.map( el => {
      //   el.id != payload.id
      // })
      // user = new_user
      console.log('user logout');
    })

})

server.listen(3000, () => {
    console.log('Listening to port ' + 3000)
})