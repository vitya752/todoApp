import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { 
    setViewSearchWindowAC, 
    setSearchFieldAC, 
    setSelectedNewIdAC, 
    setFirstMessageAC, 
    setSelectedDialogAC 
} from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';

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

        messages,
        userId,
        avatar
    } = props;

    const dialogsProps = {
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
        setFirstMessageAC
    };

    const messagesProps = {
        userId,
        avatar,
        messages
    };
    
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
        avatar: state.auth.avatar
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setViewSearchWindowAC,
        setSearchFieldAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        setSelectedDialogAC,


    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogsContainer)