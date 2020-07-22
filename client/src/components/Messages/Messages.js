import React from 'react';

import "./Messages.css";

import Message from './Message/Message';
import ErrorAlert from 'components/templates/ErrorAlert/ErrorAlert';

const Messages = ({ messages = [], userId }) => {

    let id = 1;
    const renderMessages = messages.length > 0 ? 
            messages.map(item => {
                return <Message key={id++} item={item} userId={userId} />
            })
            :
            (
                <ErrorAlert type="warning">
                    Чат пуст! Начните общение...
                </ErrorAlert>
            );

    return (
        <div className="messages">
            {renderMessages}
        </div>
    )
};

export default Messages;