const express = require('express')
const axios = require('axios').default

const app = express()

app.use(express.json())

const events = []

app.post('/events', (req, res) => {
    const event = req.body

    events.push(event)

    const services = [
        'http://localhost:4000/events',
        'http://localhost:4001/events',
        'http://localhost:4002/events',
        'http://localhost:4003/events',
    ]
    services.forEach(service => {
        axios.post(service, event)
    })

    res.send({ status: 'OK' })
})

app.get('/events', (req, res) => {
    res.send(events)
})

const port = 4005

app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`)
})