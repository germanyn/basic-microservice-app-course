const express = require('express')
const cors = require('cors')
const { randomBytes } = require('crypto')
const axios = require('axios').default

const app = express()

app.use(cors())
app.use(express.json())

const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
    const comment = {
        id: randomBytes(4).toString('hex'),
        content: req.body.content,
        postId: req.params.id,
        status: 'pending',
    }
    commentsByPostId[comment.postId] = [
        ...commentsByPostId[comment.postId] || [],
        comment,
    ]

    await axios.post(`http://localhost:4005/events`, {
        type: 'CommentCreated',
        data: comment,
    })

    res.status(201).send(comment)
})

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    switch (type) {
        case 'CommentModerated': {
            const { id, status, postId, content } = data

            const comments = commentsByPostId[postId]
            const comment = comments
                .find(comment => comment.id === id)
            comment.status = status

            await axios.post(`http://localhost:4005/events`, {
                type: 'CommentUpdated',
                data: {
                    id,
                    status,
                    postId,
                    content,
                },
            })
        } break
    }
    console.log('Received Event', req.body.type)
    res.send({})
})

const port = 4001

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`)
})