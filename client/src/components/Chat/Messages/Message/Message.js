import React from 'react';

const Message = ({ item, userId }) => {
    return (
        <div className={`message-block ${userId === item.senderId && 'message-block--my'}`}>
            <div className="message-content">
                <div className="message-author">
                    <img 
                        src={item.avatar ? item.avatar : "https://instagram.inoutmkt.com.br/assets/img/no-avatar.png" }
                        className="message-avatar"
                        alt={item.avatar ? item.author : "no-avatar" } />
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