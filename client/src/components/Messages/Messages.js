import React, { useRef, useEffect } from 'react';

import "./Messages.css";

import Message from './Message/Message';
import ErrorAlert from 'components/templates/ErrorAlert/ErrorAlert';

const Messages = ({ messages = [], userId }) => {

    const messagesRef = useRef();

    useEffect(() => {
        messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    });

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
        <div className="messages" ref={messagesRef} >
            {renderMessages}
        </div>
    )
};

export default Messages;