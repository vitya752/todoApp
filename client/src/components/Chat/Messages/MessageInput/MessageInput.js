import React, { useState } from 'react';
import './MessageInput.css';

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
            <div className="avatar-block">
                <img 
                    src={avatar ? avatar : "https://instagram.inoutmkt.com.br/assets/img/no-avatar.png"} 
                    alt="avatar"/>
            </div>
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