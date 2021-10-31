const express = require('express')
const cors = require('cors')
const axios = require('axios').default

const app = express()

app.use(express.json())

app.use(cors())

app.post('/events', async (req, res) => {
    const { type, data } = req.body
    switch (type) {
        case 'CommentCreated': {
            const { id, content, postId } = data
            const status = content.includes('orange')
                ? 'rejected'
                : 'approved'
            await axios.post(`http://event-bus-srv:4005/events`, {
                type: 'CommentModerated',
                data: {
                    id,
                    postId,
                    content,
                    status,
                },
            })
        } break
    }
    res.send({})
})

const port = 4003

app.listen(port, () => {
    console.log(`listening to http://localhost:${port}`)
})