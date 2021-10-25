const CommentList = ({ comments }) => {

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
