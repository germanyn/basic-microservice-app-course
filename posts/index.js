const express = require('express')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/posts', (req, res) => {
    const post = {
        id: randomBytes(4).toString('hex'),
        title: req.body.title,
    }
    posts[post.id] = post
    res.status(201).send(post)
})

const port = 4000

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})