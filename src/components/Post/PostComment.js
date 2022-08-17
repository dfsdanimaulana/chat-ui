const PostComment = ({ post }) => {

    return (
         <div className='card-footer card-comments collapse' id={`comment${post._id}`}>
            { post && (
                post.comment.reverse().slice(-3).map((comment)=> (
                    <div className='card-comment' key={comment._id}>
                        {/* User image */}
                        <img
                            className='img-circle img-sm'
                            src={comment.sender?.img_thumb}
                            alt='Not found'
                        />
                        <div className='comment-text'>
                            <span className='username'>
                                {comment.sender?.username}
                                <span className='text-muted float-right'>
                                    {comment.timeSend}
                                </span>
                            </span>
                            {/* /.username */}
                            {comment.msg}
                        </div>
                        {/* /.comment-text */}
                    </div>
                ))
            )}
        </div>
    )
}

export default PostComment