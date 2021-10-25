const express = require('express')
const cors = require('cors')
const axios = require('axios').default

const app = express()

app.use(express.json())

app.use(cors())

const posts = {}

app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    console.log()
    const { type, data } = req.body
    switch (type) {
        case 'PostCreated': {
            const { id, title } = data
            posts[data.id] = {
                id,
                title,
                comments: [],
            }
        } break
        case 'CommentCreated': {
            const { id, content, postId } = data
            const post = posts[postId]
            posts[postId] = {
                ...post,
                comments: [
                    ...post.comments,
                    {
                        id,
                        content,
                    }
                ]

            }
        } break
    }
    res.send({})
})

const port = 4002

app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`)
})