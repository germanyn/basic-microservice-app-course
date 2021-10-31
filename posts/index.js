const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios').default

const app = express()

app.use(cors())
app.use(express.json())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', async (req, res) => {
    const post = {
        id: randomBytes(4).toString('hex'),
        title: req.body.title,
    }
    posts[post.id] = post

    await axios.post(`http://localhost:4005/events`, {
        type: 'PostCreated',
        data: post,
    })

    res.status(201).send(post)
})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.send({})
})

const port = 4000

app.listen(port, () => {
    console.log('v55')
    console.log(`listening at http://localhost:${port}`)
})