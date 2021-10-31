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
    handleEvent(req.body)
    res.send({})
})

async function handleEvent(event) {
    const { type, data } = event
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
            const { id, content, postId, status } = data
            const post = posts[postId]
            posts[postId] = {
                ...post,
                comments: [
                    ...post.comments,
                    {
                        id,
                        content,
                        status,
                    }
                ]

            }
        } break
        case 'CommentUpdated': {
            const { id, content, postId, status } = data
            const post = posts[postId]
            const comment = post.comments
                .find(comment => comment.id === id)
            comment.content = content
            comment.status = status
        } break
    }
}

const port = 4002

app.listen(port, async () => {
    console.log(`listening to http://localhost:${port}`)
    try {
        /** @type {{data: any[]}} */
        const { data } = await axios.get('http://event-bus-srv:4005/events')
        data.forEach(async event => {
            console.log('Processing: ' + event.type)
            await handleEvent(event)
        })
    } catch(error) {
        console.log(error)
    }
})