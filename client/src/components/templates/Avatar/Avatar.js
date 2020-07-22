import React from 'react';

import './Avatar.css';

const Avatar = ({ avatar, small, alt }) => {
    return (
        <div className={`avatar-block ${small ? 'avatar-block_small' : ''}`}>
            <img 
                src={avatar ? avatar : "https://instagram.inoutmkt.com.br/assets/img/no-avatar.png" }
                className="message-avatar"
                alt={alt ? alt : avatar ? avatar : 'no-avatar' } />
        </div>
    )
};

export default Avatar;