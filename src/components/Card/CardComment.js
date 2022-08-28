import Picker from 'emoji-picker-react'
import { useState, useRef } from 'react'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

export default function CardComment() {
    const ref = useRef()
    const [inputText, setInputText] = useState('')
    const [isEmojiChosen, setIsEmojiChosen] = useState(false)

    const onEmojiClick = (_, emojiObject) => {
        setInputText((prevText) => prevText + emojiObject.emoji)
    }

    useOnClickOutside(ref, () => setIsEmojiChosen((val) => !val))

    return (
        <div className='input-group w-75 w-md-50'>
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
            <span className='input-group-text'>
                <i className='bi bi-send'></i>
            </span>
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
        </div>
    )
}
