import axios from 'axios'
import { useEffect, useState } from 'react'

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([])

    const fetchComments = async () => {
        /** @type {{data: any[]}} */
        const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
        setComments(data)
    }

    useEffect(() => {
        fetchComments()
    }, [])

    return (
        <div>
            <i>Comments {comments.length}</i>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>{comment.content}</li>
                ))}
            </ul>
        </div>
    )
}

export default CommentList
