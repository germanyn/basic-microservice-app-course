const express = require('express')
const axios = require('axios').default

const app = express()

app.use(express.json())

const events = []

app.post('/events', (req, res) => {
    const event = req.body

    events.push(event)

    const services = [
        'http://posts-srv:4000/events',
        'http://comments-srv:4001/events',
        'http://query-srv:4002/events',
        'http://moderation-srv:4003/events',
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