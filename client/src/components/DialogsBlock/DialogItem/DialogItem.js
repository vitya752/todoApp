import React from 'react';
import Avatar from '../../templates/Avatar/Avatar';

const DialogItem = (props) => {

    const {
        item,
        selectedDialog,
        setSelectedDialogAC
    } = props;

    return (
        <li 
                    className={`dialogs__item ${item.id === selectedDialog ? 'dialogs__item_active' : ''}`}
                    onClick={() => setSelectedDialogAC(item.id)}>
            <Avatar small="true" avatar={item.avatar} alt={item.email} />
            <div className="item__content">
                <span className="item__email">{item.email}</span>
                <span className={`item__message ${item.my ? 'item__message_my-unread' : ''}`}>{`${item.text.substring(0, 25)}...`}</span>
            </div>
            {
                item.new > 0 &&
                <div className="item__new-messages">
                    <span>{item.new}</span>
                </div>    
            }
        </li>
    )
};

export default DialogItem;