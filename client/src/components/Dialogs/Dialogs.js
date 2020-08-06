import React, { useContext, useState } from 'react';

import './Dialogs.css';

import DialogsBlock from 'components/DialogsBlock/DialogsBlock';
import Messages from 'components/Messages/Messages';
import MessageInput from 'components/Messages/MessageInput/MessageInput';
import ErrorAlert from 'components/templates/ErrorAlert/ErrorAlert';
import Loader from 'components/templates/Loader/Loader';
import { DialogsContext } from 'context';

const Dialogs = (props) => {

    const { loading, selectedDialog } = useContext(DialogsContext);

    const [dialogWindowStatus, setDialogWindowStatus] = useState(false);

    const toggleMenu = () => {
        setDialogWindowStatus(!dialogWindowStatus);
    };

    const {
        messages, 
        userId, 
        submitMessage, 
        avatar,
        declareIsTyping,
        isTyping
    } = props.messagesProps;

    return (
        <div className="row">
            <div className="col-12 col-lg-3 pl-0 pr-0">
                <button 
                    className="btn btn-primary w-100 dialogs-toggler"
                    onClick={toggleMenu}
                    >
                    {
                        dialogWindowStatus ? (selectedDialog && selectedDialog.length > 0 ? 'Скрыть список (диалог открыт)' : 'Скрыть список') : 'Список диалогов'
                    }
                </button>
                <DialogsBlock dialogWindowStatus={dialogWindowStatus} />
            </div>
            <div className="col-12 col-lg-9 pl-0 pr-0 pl-lg-2 m-0 messages-wrapper w-auto">
                {
                    selectedDialog && messages.length > 0 ? (
                        <>
                            <Messages messages={messages} userId={userId} />
                            <MessageInput 
                                isTyping={isTyping}
                                declareIsTyping={declareIsTyping} 
                                submitMessage={submitMessage} 
                                avatar={avatar} />
                        </>
                    ) : (
                        <div className="messages-plug text-center">
                            {
                                loading ? <Loader /> : <ErrorAlert type="warning">Выберите собеседника</ErrorAlert>
                            }
                        </div>
                    )
                }
            </div> 
        </div>
    )
}

export default Dialogs;