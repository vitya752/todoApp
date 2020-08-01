import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DialogsContext } from 'context';

import Dialogs from './Dialogs';
import { 
    setViewSearchWindowAC, 
    setSearchFieldAC, 
    setSelectedNewIdAC, 
    setFirstMessageAC, 
    pushToMessagesAC,
    setSelectedDialogAC,
    getDialogsThunk,
    getMessagesFromDialogThunk,
    findUsersThunk,
    sendMessageThunk,
    updateDialogsThunk
} from 'redux/dialogsReducer';
import { useEffect } from 'react';

const DialogsContainer = (props) => {

    const {
        socket,

        dialogs,
        loading,
        selectedDialog,
        setSelectedDialogAC,
        searchField,
        viewSearchWindow,
        foundUsers,
        selectedNewId,
        firstMessage,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        pushToMessagesAC,

        getDialogsThunk,
        getMessagesFromDialogThunk,
        findUsersThunk,
        sendMessageThunk,
        updateDialogsThunk,

        messages,
        userId,
        avatar,
        nickname, 
        email,
        token
    } = props;

    const selectDialog = (dialogId, participants) => {
        socket.emit('DIALOGS:JOIN_TO_DIALOG', {
            dialogId
        });
        setSelectedDialogAC(dialogId);
        getMessagesFromDialogThunk(token, dialogId, participants);
    };

    const submitMessage = (text) => {

        const partnerId = findPartnerId(userId, selectedDialog, dialogs);
        
        const user = {
            userId,
            avatar,
            nickname,
            email
        };

        sendMessageThunk(token, selectedDialog, text);

        socket.emit('DIALOGS:SEND_MESSAGE_TO_DIALOG', {
            user,
            text,
            dialogId: selectedDialog,
            partnerId
        });

    };

    const findPartnerId = (userId, selectedDialog, dialogs) => {        
        const dialog = dialogs.filter(item => item.id === selectedDialog);
        const participants = dialog[0].participants;

        if(participants.author._id === userId) return participants.partner._id;
        else return participants.author._id;
    };

    useEffect(() => {
        getDialogsThunk(token, userId);
        socket.emit('DIALOGS:JOIN', { userId });

        return () => {
            socket.disconnect();
        };

    }, [getDialogsThunk, token, userId, socket]);
    
    useEffect(() => {
        socket.on('DIALOGS:ADD_MESSAGE', data => {
            pushToMessagesAC(data.message);
            updateDialogsThunk(data.newDialog);
        });

    }, [pushToMessagesAC, updateDialogsThunk, socket]);

    const dialogsProps = {
        token,
        dialogs,
        loading,
        selectedDialog,
        searchField,
        viewSearchWindow,
        foundUsers,
        selectedNewId,
        firstMessage,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        findUsersThunk,

        selectDialog
    };

    const messagesProps = {
        userId,
        avatar,
        messages,
        submitMessage
    };

    return (
        <DialogsContext.Provider value={dialogsProps} >
            <Dialogs messagesProps={messagesProps} />
        </DialogsContext.Provider>
    )
};


const mapStateToProps = state => {
    return {
        loading: state.dialogsPage.loading,
        firstMessage: state.dialogsPage.firstMessage,
        foundUsers: state.dialogsPage.foundUsers,
        selectedNewId: state.dialogsPage.selectedNewId,
        searchField: state.dialogsPage.searchField,
        dialogs: state.dialogsPage.dialogs,
        viewSearchWindow: state.dialogsPage.viewSearchWindow,
        selectedDialog: state.dialogsPage.selectedDialog,
        
        messages: state.dialogsPage.messages,
        userId: state.auth.userId,
        avatar: state.auth.avatar,
        token: state.auth.token,
        nickname: state.auth.nickname,
        email: state.auth.email
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setViewSearchWindowAC,
        setSearchFieldAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        pushToMessagesAC,
        setSelectedDialogAC,

        getDialogsThunk,
        getMessagesFromDialogThunk,
        findUsersThunk,
        sendMessageThunk,
        updateDialogsThunk

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer)