import React, { useContext } from 'react';

import { DialogsContext } from 'context';

const DialogsNewMessage = () => {

    const {
        loading,
        firstMessage,
        selectedNewId,
        setFirstMessageAC,
        createDialog
    } = useContext(DialogsContext);
    
    return (
        <div className="found__new-message">
            <textarea 
                placeholder="Напишите сообщение"
                name="newMessage"
                value={firstMessage}
                onChange={(e) => { setFirstMessageAC(e.target.value) }}
                disabled={!loading && selectedNewId ? false : true}></textarea>
            <button
                onClick={() => createDialog(selectedNewId, firstMessage)}
                disabled={!loading && (selectedNewId && firstMessage.length > 0) ? false : true}
                className="dialogs__button text-center" 
                type="button">
                Отправить сообщение
            </button>
        </div>
    )
};

export default DialogsNewMessage;