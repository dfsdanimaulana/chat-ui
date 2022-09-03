import Picker from 'emoji-picker-react'
import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { useAxiosPrivate } from '../../hooks/useAxiosPrivate'

export default function CardCommentInput({ postId }) {
    const axiosPrivate = useAxiosPrivate()
    const currentUser = useSelector((state) => state.user.value)
    const ref = useRef()
    const [inputText, setInputText] = useState('')
    const [isEmojiChosen, setIsEmojiChosen] = useState(false)

    const onEmojiClick = (_, emojiObject) => {
        setInputText((prevText) => prevText + emojiObject.emoji)
    }

    useOnClickOutside(ref, () => setIsEmojiChosen((val) => !val))

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = {
            msg: inputText,
            senderId: currentUser._id,
            postId,
        }

        try {
            await axiosPrivate.post('/comment', data)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit} className='input-group w-75 w-md-50'>
            <span
                className='input-group-text'
                onClick={() => setIsEmojiChosen((val) => !val)}>
                <i className='bi bi-emoji-smile'></i>
            </span>
            <input
                type='text'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className='form-control'
                placeholder='Add a comment...'
                aria-label="Recipient's username"
                aria-describedby='basic-addon2'
            />
            <button className='input-group-text'>
                <i className='bi bi-send'></i>
            </button>
            {isEmojiChosen && (
                <div
                    ref={ref}
                    className='position-absolute'
                    style={{
                        zIndex: 9999,
                        top: '-340px',
                    }}>
                    <Picker innerRef={ref} onEmojiClick={onEmojiClick} />
                </div>
            )}
        </form>
    )
}
