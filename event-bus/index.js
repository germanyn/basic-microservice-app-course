const express = require('express')
const axios = require('axios').default

const app = express()

app.use(express.json())

app.post('/events', (req, res) => {
    const event = req.body

    const services = [
        'http://localhost:4000/events',
        'http://localhost:4001/events',
        'http://localhost:4002/events',
    ]
    services.forEach(service => {
        axios.post(service, event)
    })

    res.send({ status: 'OK' })
})

const port = 4005

app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`)
})