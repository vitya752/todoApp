import React from 'react';

const OnlineUsersItem = ({data: {avatar, nickname}}) => {
    return (
        <li className="d-flex align-items-center">
            <div className="avatar-block">
                <img 
                    src={avatar ? avatar : "https://instagram.inoutmkt.com.br/assets/img/no-avatar.png"} 
                    alt={nickname} />
            </div>
            <span className="nickname">
                {nickname}
            </span>
        </li>
    )
};

export default OnlineUsersItem;