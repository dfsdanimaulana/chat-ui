function Chat({ chat }) {
    return (
        /* Message. Default to the left */
        <div className={chat.position === 'right' ? 'direct-chat-msg right' : 'direct-chat-msg'}>
            <div className="direct-chat-infos clearfix">
                <span className={chat.position === 'right' ? 'direct-chat-name float-right' : 'direct-chat-name float-left'}>
                    {chat.username}
                </span>
                <span
                    className={
                        chat.position === 'right' ? 'direct-chat-timestamp float-left' : 'direct-chat-timestamp float-right'
                    }
                >
                    {chat.timeSend}
                </span>
            </div>
            {/* /.direct-chat-infos */}
            <img className="direct-chat-img" src={chat.thumb_img} alt="Not Found" />
            {/* /.direct-chat-img */}
            <div className="direct-chat-text">{chat.msg}</div>
            {/* /.direct-chat-text */}
        </div>
        /* /.direct-chat-msg */
    )
}

export default Chat
