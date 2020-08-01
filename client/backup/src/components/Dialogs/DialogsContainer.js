import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dialogs from './Dialogs';
import { 
    setViewSearchWindowAC, 
    setSearchFieldAC, 
    setSelectedNewIdAC, 
    setFirstMessageAC, 
    getDialogsThunk,
    getMessagesFromDialogThunk,
    findUsersThunk
} from 'redux/dialogsReducer';
import { useEffect } from 'react';

const DialogsContainer = (props) => {

    const {
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

        getDialogsThunk,
        getMessagesFromDialogThunk,
        findUsersThunk,

        messages,
        userId,
        avatar,
        token
    } = props;

    const dialogsProps = {
        token,
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
        getMessagesFromDialogThunk,
        findUsersThunk
    };

    const messagesProps = {
        userId,
        avatar,
        messages
    };

    useEffect(() => {
        getDialogsThunk(token, userId);
    }, [getDialogsThunk, token, userId]);
    
    return (
        <Dialogs dialogsProps={dialogsProps} messagesProps={messagesProps} />
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
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setViewSearchWindowAC,
        setSearchFieldAC,
        setSelectedNewIdAC,
        setFirstMessageAC,

        getDialogsThunk,
        getMessagesFromDialogThunk,
        findUsersThunk

    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer)