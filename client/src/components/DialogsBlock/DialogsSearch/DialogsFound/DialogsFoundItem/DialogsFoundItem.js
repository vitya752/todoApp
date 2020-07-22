import React from 'react';
import Avatar from '../../../../templates/Avatar/Avatar';

const DialogsFoundItem = (props) => {

    const {
        item,
        selectedNewId,
        setSelectedNewIdAC
    } = props;

    return (
        <li>
            <label htmlFor={item.partnerId}>
                <Avatar 
                    small={true}
                    avatar={item.avatar}
                    alt={item.email} />
                <span>{item.email}</span>
                <input 
                    id={item.partnerId}
                    name="checkDialog" 
                    type="radio" 
                    value={item.partnerId}
                    checked={selectedNewId === item.partnerId}
                    onChange={(e) => setSelectedNewIdAC(e.target.value)} />
            </label>
        </li>
    )
};

export default DialogsFoundItem;