import React, { useContext } from 'react';

import DialogsBlock from 'components/DialogsBlock/DialogsBlock';
import Messages from 'components/Messages/Messages';
import MessageInput from 'components/Messages/MessageInput/MessageInput';
import ErrorAlert from 'components/templates/ErrorAlert/ErrorAlert';
import Loader from 'components/templates/Loader/Loader';
import { DialogsContext } from 'context';

const Dialogs = (props) => {

    const { loading, selectedDialog } = useContext(DialogsContext);

    const {
        messages, 
        userId, 
        submitMessage, 
        avatar 
    } = props.messagesProps;

    return (
        <div className="row">
            <div className="col-3 pl-0 pr-0">
                <DialogsBlock />
            </div>
            <div className="col-9 pl-2 m-0 messages-wrapper w-auto">
                {
                    selectedDialog && messages.length > 0 ? (
                        <>
                            <Messages messages={messages} userId={userId} />
                            <MessageInput submitMessage={submitMessage} avatar={avatar} />
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