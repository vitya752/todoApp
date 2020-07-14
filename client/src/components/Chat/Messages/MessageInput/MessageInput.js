import React, { useState } from 'react';
import './MessageInput.css';
import Avatar from '../../../templates/Avatar/Avatar';

const MessageInput = ({ submitMessage, avatar }) => {

    const [message, setMessage] = useState('');

    const changeHandler = (e) => {
        setMessage(e.target.value);
    };
    
    const submitHandler = () => {
        submitMessage(message);
        setMessage('');
    };

    return (
        <div className="message-input-block">
            <Avatar avatar={avatar} />
            <div className="text-block">
                <textarea 
                    name="text" 
                    value={message}
                    onChange={changeHandler}
                    placeholder="Введите свое сообщение" />
            </div>
            <button 
                className="btn btn-primary" 
                onClick={submitHandler}
                disabled={message === '' ? true : false} >Отправить</button>
        </div>
    );
};

export default MessageInput;