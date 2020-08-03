import React from 'react';

import './Avatar.css';

const Avatar = ({ avatar, small, alt, isDialog, isOnline }) => {
    return (
        <div className={ `avatar-block 
                ${isDialog ? 'avatar-block_status' : ''}
                ${isOnline ? 'avatar-block_status_online' : ''}
                ${small ? 'avatar-block_small' : ''}
            `}>
            <img 
                src={avatar ? avatar : "https://instagram.inoutmkt.com.br/assets/img/no-avatar.png" }
                className="message-avatar"
                alt={alt ? alt : avatar ? avatar : 'no-avatar' } />
        </div>
    )
};

export default Avatar;