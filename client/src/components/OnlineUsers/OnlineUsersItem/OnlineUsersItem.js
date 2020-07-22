import React from 'react';

import Avatar from 'components/templates/Avatar/Avatar';

const OnlineUsersItem = ({data: {avatar, nickname}}) => {
    return (
        <li className="d-flex align-items-center">
            <Avatar avatar={avatar} alt={nickname} />
            <span className="nickname">
                {nickname}
            </span>
        </li>
    )
};

export default OnlineUsersItem;