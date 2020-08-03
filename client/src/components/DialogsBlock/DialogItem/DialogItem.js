import React from 'react';

import './DialogItem.css';
import Avatar from 'components/templates/Avatar/Avatar';
import { useContext } from 'react';
import { DialogsContext } from 'context';

const DialogItem = (props) => {

    const { item } = props;

    const {
        selectedDialog,
        selectDialog
    } = useContext(DialogsContext);

    return (
        <li 
            className={`dialogs__item ${item.id === selectedDialog ? 'dialogs__item_active' : ''}`}
            onClick={() => selectDialog(item.id, item.participants)} >
            <Avatar small="true" avatar={item.avatar} alt={item.email} />
            <div className="dialog">
                <div className="d-flex flex-row justify-content-between">
                    <span className="dialog__email">{item.email}</span>    
                    <span className="dialog__updated">{item.date}</span>
                </div>
                <span className={`dialog__message ${item.my ? item.unreadMessages ? 'dialog__message_my-unread' : 'dialog__message_my-read' : ''}`}>
                    {
                        item.text.length > 20 ? `${item.text.substring(0, 20)}...` : item.text
                    }
                </span>
            </div>
            {
                item.unreadMessages > 0 && !item.my && (<div className="dialog__new-messages">
                                    <span>{item.unreadMessages}</span>
                                </div>) 
            }
        </li>
    )
};

export default DialogItem;