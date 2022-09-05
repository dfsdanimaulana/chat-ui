import { Fragment } from 'react'
import { useState } from 'react'
import NavbarLte from '../Navbar/Navbar.js'
import SidebarLte from '../Sidebar/Sidebar.js'
import Footer from '../Footer/Footer.js'

import Chat from './Chat.js'
import ContactsList from './ContactsList.js'

// data will be fetched from api in the future

export default function ChatBody() {
    const [chats, setChats] = useState([
        {
            id: 1,
            username: 'Alexander',
            msg: 'Hello everyone, how are you doing?',
            timeSend: '12:17 AM Today',
            position: 'left',
            thumb_img: 'https://source.unsplash.com/random/128x128',
        },
        {
            id: 2,
            username: 'Lorem Ispum',
            msg: 'Hello everyone, how are you doing?',
            timeSend: '12:30 AM Today',
            position: 'right',
            thumb_img: 'https://source.unsplash.com/random/128x128',
        },
    ])

    return (
        <Fragment>
            <NavbarLte />
            <SidebarLte />
            <div className='content-wrapper position-relative'>
                <div className='card direct-chat direct-chat-primary position-absolute m-3 end-0 start-0 bottom-0 top-0'>
                    <div className='card-header'>
                        <h3 className='card-title'>Direct Chat</h3>
                        <div className='card-tools'>
                            <span
                                title='3 New Messages'
                                className='badge badge-primary'
                            >
                                3
                            </span>

                            <button
                                type='button'
                                className='btn btn-tool'
                                title='Contacts'
                                data-widget='chat-pane-toggle'
                            >
                                <i className='fas fa-comments' />
                            </button>
                            <button type='button' className='btn btn-tool'>
                                <i className='fas fa-list-ul' />
                            </button>
                        </div>
                    </div>
                    {/* /.card-header */}
                    <div className='card-body'>
                        {/* Conversations are loaded here */}
                        <div className='direct-chat-messages h-100'>
                            {chats &&
                                chats.map((chat) => (
                                    <Chat key={chat.id} chat={chat} />
                                ))}
                        </div>
                        {/*/.direct-chat-messages*/}
                        {/* Contacts are loaded here */}
                        <div className='direct-chat-contacts h-100'>
                            <ul className='contacts-list'>
                                <ContactsList />
                                <ContactsList />
                                <ContactsList />
                                <ContactsList />
                                <ContactsList />
                                <ContactsList />
                                <ContactsList />
                            </ul>
                            {/* /.contacts-list */}
                        </div>
                        {/* /.direct-chat-pane */}
                    </div>
                    {/* /.card-body */}
                    <div className='card-footer'>
                        <form action='#' method='post'>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    name='message'
                                    placeholder='Type Message ...'
                                    className='form-control'
                                />
                                <span className='input-group-append'>
                                    <button
                                        type='button'
                                        className='btn btn-primary'
                                    >
                                        Send
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                    {/* /.card-footer*/}
                </div>
                <Footer />
            </div>
        </Fragment>
    )
}
