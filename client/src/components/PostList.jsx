import axios from 'axios'
import { useEffect, useState } from 'react'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
    const [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        const result = await axios.get('http://localhost:4002/posts')
        setPosts(result.data)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <div className='row'>
            {Object.values(posts).map(post => (
                <div className='col' key={post.id}>
                    <div className='card h-100'>
                        <div className='card-body'>
                            <h3>{post.title || 'No title'}</h3>
                            <CommentList comments={post.comments}/>
                            <CommentCreate
                                postId={post.id}
                                
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostList
