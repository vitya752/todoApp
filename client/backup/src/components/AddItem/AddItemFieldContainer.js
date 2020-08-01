import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestAddNoteThunk, setNewNoteAC } from 'redux/notesReducer';
import AddItemField from './AddItemField';

const AddItemFieldContainer = ({ token, sending, requestAddNoteThunk, setNewNoteAC, newNote }) => {

    const handleChangeField = (e) => {
        setNewNoteAC(e.target.value);
    };

    return (
        <AddItemField 
            newNote={newNote}
            handleChangeField={handleChangeField} 
            sending={sending}
            token={token} 
            requestAddNoteThunk={requestAddNoteThunk} />
    )
};

const mapStateToProps = (state) => {
    return {
        sending: state.todoPage.sending,
        newNote: state.todoPage.newNote,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestAddNoteThunk,
        setNewNoteAC
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(AddItemFieldContainer);