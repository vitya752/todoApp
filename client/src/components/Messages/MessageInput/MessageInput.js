import React, { useState } from 'react';

import './MessageInput.css';
import Avatar from 'components/templates/Avatar/Avatar';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

const MessageInput = ({ submitMessage, avatar }) => {

    const [message, setMessage] = useState('');
    const [viewSmiles, setViewSmiles] = useState(false);

    const changeHandler = (e) => {
        setMessage(e.target.value);
    };
    
    const submitHandler = () => {
        submitMessage(message);
        setMessage('');
    };

    const addEmoji = e => {
        let emoji = e.native;
        console.log(e)
        setMessage(message + emoji);
    };

    const toggleViewSmiles = () => {
        setViewSmiles(!viewSmiles);
    };

    return (
        <div className="message-input">
            <Avatar avatar={avatar} />
            <div className="message-input__content">
                <textarea 
                    name="text" 
                    value={message}
                    onChange={changeHandler}
                    placeholder="Введите свое сообщение" />
                <button 
                    className="message-input__smiles-toggle"
                    onClick={toggleViewSmiles} >
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 368 368" space="preserve">
                        <g>
                            <g>
                                <g>
                                    <path d="M261.336,226.04c-3.296-2.952-8.36-2.664-11.296,0.624C233.352,245.312,209.288,256,184,256
                                        c-25.28,0-49.352-10.688-66.04-29.336c-2.952-3.288-8-3.576-11.296-0.624c-3.296,2.944-3.568,8-0.624,11.296
                                        C125.76,259.368,154.176,272,184,272c29.832,0,58.248-12.64,77.96-34.664C264.904,234.04,264.624,228.984,261.336,226.04z"/>
                                    <path d="M184,0C82.544,0,0,82.544,0,184s82.544,184,184,184s184-82.544,184-184S285.456,0,184,0z M184,352
                                        c-92.64,0-168-75.36-168-168S91.36,16,184,16s168,75.36,168,168S276.64,352,184,352z"/>
                                    <path d="M248,128c-22.056,0-40,17.944-40,40c0,4.416,3.584,8,8,8c4.416,0,8-3.584,8-8c0-13.232,10.768-24,24-24s24,10.768,24,24
                                        c0,4.416,3.584,8,8,8c4.416,0,8-3.584,8-8C288,145.944,270.056,128,248,128z"/>
                                    <path d="M144,168c0,4.416,3.584,8,8,8s8-3.584,8-8c0-22.056-17.944-40-40-40c-22.056,0-40,17.944-40,40c0,4.416,3.584,8,8,8
                                        s8-3.584,8-8c0-13.232,10.768-24,24-24S144,154.768,144,168z"/>
                                </g>
                            </g>
                        </g>
                    </svg>  
                </button>
                {
                    viewSmiles ? (
                        <div className="message-input__smiles">
                            <Picker native onSelect={addEmoji} />
                        </div>   
                    ) : null
                }
            </div>
            <button 
                className="btn btn-primary" 
                onClick={submitHandler}
                disabled={message === '' ? true : false} >Отправить</button>
        </div>
    );
};

export default MessageInput;