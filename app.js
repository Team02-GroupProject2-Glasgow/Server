const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const PORT = 3000 || process.env.PORT

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
    socket.emit('init', tebak_kata)

    socket.on('joinRoom', ({ username, room, progress }) => {           
      const newUser = userJoin(socket.id, username, room, progress);
      console.log(newUser, '<== new user');
      socket.emit('sendPlayer', newUser)
      user.push(newUser);
      socket.join(user.room);
      io.emit('players', user)
      // console.log(user);
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
      io.emit('players', user)
    })

    socket.on('getTheWinner', payload => {
      io.emit('setTheWinner', payload)
    })

    socket.on('restartGame', () => {
      userLeave(socket.id)
      console.log(socket.id, '<==leave');
      io.emit('players', user)
    })

    socket.on('disconnect', () => {
      userLeave(socket.id)
      io.emit('players', user)
    })
})

function userJoin(id, username, room, progress) {
  const newUser = { id, username, room, progress };
  return newUser
}

function userLeave(id){
  const index = user.findIndex(user => user.id === id)
  if(index !== -1) {
      return user.splice(index, 1)
  }
}

server.listen(PORT, () => {
    console.log('Listening to port ' + PORT)
})
