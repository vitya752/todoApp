import React from 'react';

import OnlineUsers from 'components/OnlineUsers/OnlineUsers';
import Messages from 'components/Messages/Messages';
import MessageInput from 'components/Messages/MessageInput/MessageInput';

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