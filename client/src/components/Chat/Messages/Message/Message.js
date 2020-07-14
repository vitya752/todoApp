import React from 'react';
import Avatar from '../../../templates/Avatar/Avatar';

const Message = ({ item, userId }) => {
    return (
        <div className={`message-block ${userId === item.senderId && 'message-block--my'}`}>
            <div className="message-content">
                <div className="message-author">
                    <Avatar small={true} avatar={item.avatar} alt={item.author} />
                    <span>{item.author}</span>
                </div>
                <div className="message-text">
                    {item.text}
                </div>
            </div>
        </div>
    )
};

export default Message;