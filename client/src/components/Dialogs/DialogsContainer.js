import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { DialogsContext } from 'context';

import Dialogs from './Dialogs';
import { 
    setViewSearchWindowAC, 
    setSearchFieldAC, 
    setSelectedNewIdAC, 
    setFirstMessageAC, 
    pushToMessagesThunk,
    setSelectedDialogAC,
    updateReadstatusAC,
    setMessagesAC,
    setIsTypingAC,
    getDialogsThunk,
    getMessagesFromDialogThunk,
    findUsersThunk,
    sendMessageThunk,
    updateDialogThunk,
    createDialogThunk
} from 'redux/dialogsReducer';
import { getPartner } from 'utils/getPartner';

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
        isTyping,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        pushToMessagesThunk,
        updateReadstatusAC,
        setMessagesAC,
        setIsTypingAC,

        getDialogsThunk,
        getMessagesFromDialogThunk,
        findUsersThunk,
        sendMessageThunk,
        updateDialogThunk,
        createDialogThunk,

        messages,
        userId,
        avatar,
        nickname, 
        email,
        token
    } = props;

    const createDialog = (selectedNewId, firstMessage) => {
        createDialogThunk(token, userId, selectedNewId, firstMessage)
            .then(() => {
                getDialogsThunk(token, userId);
                setMessagesAC([]);
                setSelectedDialogAC('');
                socket.emit('DIALOGS:CREATED_DIALOG', {
                    partnerId: selectedNewId
                });
            });
    };

    const selectDialog = (dialogId, participants) => {
        socket.emit('DIALOGS:LEAVE_FROM_DIALOG', {
            dialogId: selectedDialog
        });
        socket.emit('DIALOGS:JOIN_TO_DIALOG', {
            dialogId
        });
        setSelectedDialogAC(dialogId);
        getMessagesFromDialogThunk(token, dialogId, participants);
    };

    const submitMessage = (text) => {

        const partner = getPartner(userId, selectedDialog, dialogs);
        
        const user = {
            userId,
            avatar,
            nickname,
            email
        };

        sendMessageThunk(token, selectedDialog, text)
            .then(() => {
                socket.emit('DIALOGS:SEND_MESSAGE_TO_DIALOG', {
                    user,
                    text,
                    dialogId: selectedDialog,
                    partnerId: partner._id
                });
            });
    };

    const declareIsTyping = () => {
        const partner = getPartner(userId, selectedDialog, dialogs);
        const author = getPartner(partner._id, selectedDialog, dialogs);

        socket.emit('DIALOGS:IS_TYPING', {
            writersName: author.nickname || author.email,
            partnerId: partner._id,
            dialogId: selectedDialog
        });
    };

    const setIsTyping = useCallback(data => {
        if(data.partnerId === userId) {
            clearInterval(window.setIsTypingTimer);
            setIsTypingAC({ status: true, writersName: data.writersName });
            window.setIsTypingTimer = setTimeout(() => {
                setIsTypingAC({ status: false, writersName: '' });
            }, 2000);
        }
    }, [setIsTypingAC, userId]);

    useEffect(() => {
        getDialogsThunk(token, userId);
        socket.emit('DIALOGS:JOIN', { userId });

        return () => {
            setMessagesAC([]);
            setSelectedDialogAC('');
            socket.disconnect();
        };

    }, [getDialogsThunk, setMessagesAC, setSelectedDialogAC, token, userId, socket]);
    
    useEffect(() => {
        socket.on('DIALOGS:ADD_MESSAGE', data => {
            pushToMessagesThunk(data.message);
            // updateDialogThunk(data.newDialog, userId);
            getDialogsThunk(token, userId);
        });

        socket.on('DIALOGS:MESSAGES_READED', data => {
            updateReadstatusAC(data.dialogId);
        });

        socket.on('DIALOGS:UPDATE_DIALOGS', () => {
            getDialogsThunk(token, userId);
        });

        socket.on('DIALOGS:SET_IS_TYPING', data => {
            setIsTyping(data);
        });

    }, [pushToMessagesThunk, getDialogsThunk, updateDialogThunk, updateReadstatusAC, setIsTyping, setMessagesAC, token, userId, socket]);

    const dialogsProps = {
        userId,
        token,
        dialogs,
        loading,
        selectedDialog,
        searchField,
        viewSearchWindow,
        foundUsers,
        selectedNewId,
        firstMessage,
        isTyping,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        findUsersThunk,
        createDialog,

        selectDialog
    };

    const messagesProps = {
        userId,
        avatar,
        messages,
        submitMessage,
        declareIsTyping,
        isTyping
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
        isTyping: state.dialogsPage.isTyping,
        
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
        pushToMessagesThunk,
        setSelectedDialogAC,
        updateReadstatusAC,
        setMessagesAC,
        setIsTypingAC,

        getDialogsThunk,
        getMessagesFromDialogThunk,
        findUsersThunk,
        sendMessageThunk,
        updateDialogThunk,
        createDialogThunk

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer)