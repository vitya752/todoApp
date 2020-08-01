import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './ItemList.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestUpdateNoteThunk, requestDeleteNoteThunk } from '../../../redux/notesReducer';
import ItemList from './ItemList';

const ItemListContainer = ({ text, itemId, requestUpdateNoteThunk, requestDeleteNoteThunk, token, important, done, sending }) => {

    const handleClick = (e) => {
        switch(e.target.name) {
            case 'important':
                return requestUpdateNoteThunk(token, itemId, !important, done);
            case 'done':
                return requestUpdateNoteThunk(token, itemId, important, !done);
            case 'delete':
                return requestDeleteNoteThunk(token, itemId);
            default: 
                return requestUpdateNoteThunk(token, itemId, important, done);
        }
    };

    return(
        <ItemList
            handleClick={handleClick}
            sending={sending}
            text={text}
            important={important}
            done={done} />
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        sending: state.todoPage.sending
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestUpdateNoteThunk,
        requestDeleteNoteThunk
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemListContainer);