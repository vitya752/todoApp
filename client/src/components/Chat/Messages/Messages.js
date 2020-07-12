import React from 'react';
import Message from './Message/Message';
import "./Messages.css";

const Messages = ({ messages = [], userId }) => {

    let id = 1;
    const renderMessages = messages.length > 0 ? 
            messages.map(item => {
                return <Message key={id++} item={item} userId={userId} />
            })
            :
            (<div className="alert alert-warning">Чат пуст! Начните общение...</div>);

    return (
        <div className="messages">
            {renderMessages}
        </div>
    )
};

export default Messages;