import React from 'react';

const DialogsNewMessage = props => {

    const {
        firstMessage,
        selectedNewId,
        setFirstMessageAC
    } = props;

    return (
        <div className="found__new-message">
            <textarea 
                placeholder="Напишите сообщение"
                name="newMessage"
                value={firstMessage}
                onChange={(e) => { setFirstMessageAC(e.target.value) }}
                disabled={selectedNewId ? false : true}></textarea>
            <button
                disabled={selectedNewId && firstMessage.length > 0 ? false : true}
                className="dialogs__button text-center" 
                type="button">
                Отправить сообщение
            </button>
        </div>
    )
};

export default DialogsNewMessage;