const express = require('express')
const app = express()

// ORDER JSON SHAPE REQUIREMENTS
// {
//   divisions: {
//     divisionName: [
//       {
//         name: playerName (String, required),
//       }
//     ]
//   }
// }

const DIVISIONS_KEY = 'divisions'

// initial variable values
var position = 0
var division = 'over30'
var order = []

const getOrder = () => {
  return require('./order')
}

const playerOrder = getOrder()
const divisions = Object.keys(playerOrder[DIVISIONS_KEY])
console.log(divisions)

app.get('/', (req, res) => {
  res.send('Hi!')
})

app.get('/order', (req, res) => {
  res.send(order)
})

app.get('/position', (req, res) => {
  res.send(position)
})

app.get('/order/next', (req, res) => {
  if (position < order.length) {
    position++
  } else {
    positon = order.length
  }
  res.send(order[position])
})

app.get('/order/previous', (req, res) => {
  if (position > 0) {
    position--
  } else {
    position = 0
  }
  res.send(order[position])
})

app.get('/order/first', (req, res) => {
  // set position to 0 and return that player
  position = 0
  res.send(order[position])
})

app.get('/order/:position', (req, res) => {
  // set position to whatever gets passed in
  if (req.params['position']) {
    const newPosition = +req.params['position']
    position = newPosition
    res.send(order[position])
  }
})

app.get('/division/:division', (req, res) => {
  // set position to whatever gets passed in
  const div = req.params['division']
  if (!playerOrder) { 
    playerOrder = getOrder()
  }
  if (div && playerOrder[DIVISIONS_KEY][div]) {
    division = div
    order = playerOrder[DIVISIONS_KEY][div]
    position = 0
    res.send({ division, order })
  }
})

app.get('/divisions', (req, res) => {
  // set position to whatever gets passed in
  res.send(divisions)
})

app.get('/divisions/current', (req, res) => {
  // set position to whatever gets passed in
  res.send(division)
})

app.listen(3000, () => console.log('Server ready'))
