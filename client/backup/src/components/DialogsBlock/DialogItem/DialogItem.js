import React from 'react';

import './DialogItem.css';
import Avatar from 'components/templates/Avatar/Avatar';

const DialogItem = (props) => {

    const {
        item,
        token, 
        selectedDialog,
        getMessagesFromDialogThunk
    } = props;

    return (
        <li 
            className={`dialogs__item ${item.id === selectedDialog ? 'dialogs__item_active' : ''}`}
            onClick={() => getMessagesFromDialogThunk(token, item.id, item.participants)} >
            <Avatar small="true" avatar={item.avatar} alt={item.email} />
            <div className="dialog">
                <div className="d-flex flex-row justify-content-between">
                    <span className="dialog__email">{item.email}</span>    
                    <span className="dialog__updated">{item.date}</span>
                </div>
                <span className={`dialog__message ${item.my ? 'dialog__message_my-unread' : ''}`}>{`${item.text.substring(0, 25)}...`}</span>
            </div>
            {
                !item.read && !item.my && (<div className="dialog__new-messages">
                                    <span>NEW</span>
                                </div>) 
            }
        </li>
    )
};

export default DialogItem;