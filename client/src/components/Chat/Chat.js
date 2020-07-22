import React from 'react';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import Messages from '../Messages/Messages';
import MessageInput from '../Messages/MessageInput/MessageInput';

const Chat = ({ submitMessage, messages, avatar, userId }) => {
    return (
        <div className="messages-wrapper">
            <OnlineUsers />
            <Messages messages={messages} userId={userId} />
            <MessageInput submitMessage={submitMessage} avatar={avatar} />
        </div> 
    )
};

export default Chat;