import Picker from 'emoji-picker-react'
import { useState, useRef } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'
import cogoToast from 'cogo-toast'
import { useUser } from '../../hooks/useUser'
import { useComments } from '../../hooks/useComments'

export default function CardCommentInput({ postId, setCommentOpen }) {
    const axiosPrivate = useAxiosPrivate()
    const ref = useRef()
    const { user } = useUser()
    const { getComments } = useComments()

    const [inputText, setInputText] = useState('')
    const [isEmojiChosen, setIsEmojiChosen] = useState(false)
    const [isPending, setIsPending] = useState(false)

    const onEmojiClick = (_, emojiObject) => {
        setInputText((prevText) => prevText + emojiObject.emoji)
    }

    useOnClickOutside(ref, () => setIsEmojiChosen((val) => !val))

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsPending(true)

        const data = {
            msg: inputText,
            senderId: user._id,
            postId
        }

        try {
            await axiosPrivate.post('/comment', data)
            getComments(postId)
            setCommentOpen(true)
            setInputText('')
            setIsPending(false)
        } catch (err) {
            setIsPending(false)
            cogoToast.error(err.message)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="input-group w-75 w-md-50">
            <span className="input-group-text" onClick={() => setIsEmojiChosen((val) => !val)}>
                <i className="bi bi-emoji-smile"></i>
            </span>
            <input
                type="text"
                required
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="form-control"
                placeholder="Add a comment..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
            />
            <button className="input-group-text">
                {isPending ? (
                    <span
                        className="spinner-border spinner-border-sm text-secondary"
                        role="status"
                        aria-hidden="true"
                    ></span>
                ) : (
                    <i className="bi bi-send"></i>
                )}
            </button>
            {isEmojiChosen && (
                <div
                    ref={ref}
                    className="position-absolute"
                    style={{
                        zIndex: 9999,
                        top: '-340px'
                    }}
                >
                    <Picker innerRef={ref} onEmojiClick={onEmojiClick} />
                </div>
            )}
        </form>
    )
}
