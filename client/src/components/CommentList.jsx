const CommentList = ({ comments }) => {

    const commentItem = (comment) => {
        
    }

    return (
        <div>
            <i>Comments {comments.length}</i>
            <ul>
                {comments.map(comment => {
                    const content = (() => {
                        switch(comment.status) {
                            case 'approved': return comment.content
                            case 'pending': return 'This comment is awaiting moderation'
                            case 'rejected': return 'Comment has been rejected'
                        }
                    })()
                    return <li key={comment.id}>{content}</li>
                })}
            </ul>
        </div>
    )
}

export default CommentList
