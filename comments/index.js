// @ts-check

const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')

const app = express()

app.use(cors())
app.use(express.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const comment = {
        id: randomBytes(4).toString('hex'),
        content: req.body.content,
        postId: req.params.id,
    }
    commentsByPostId[comment.postId] = [
        ...commentsByPostId[comment.postId] || [],
        comment,
    ]
    res.status(201).send(comment)
})

const port = 4001

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})