import React from 'react';

import Avatar from 'components/templates/Avatar/Avatar';
// import {emojify} from 'react-emojione';
 
const Message = ({ item, userId }) => {

    return (
        <div className={`message ${userId === item.senderId && 'message_my'}`}>
            <div className="message__content">
                <div className="message__author">
                    <Avatar small={true} avatar={item.avatar} alt={item.author} />
                    <span>{item.author}</span>
                </div>
                <div className="message__text">
                    {/* {emojify(item.text)} */}
                    {item.text}
                </div>
            </div>
        </div>
    )
};

export default Message;