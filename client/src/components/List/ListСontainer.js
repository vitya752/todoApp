import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import List from './List';
import { requestNotesThunk } from 'redux/notesReducer';

const ListСontainer = ({ notes, fetching, requestNotesThunk, token, search, activeFilter }) => {

    useEffect(() => {
        requestNotesThunk(token);
    }, [requestNotesThunk, token]);

    const searchNotes = (notes) => {
        if(search === '') return notes;
        return notes.filter((el) => {
            return el.text.toLowerCase().includes(search.toLowerCase());
        });
    };

    const filterNotes = (notes) => {
        switch(activeFilter) {
            case 'all':
                return notes;
            case 'active':
                return notes.filter(el => el.done === false);
            case 'done':
                return notes.filter(el => el.done === true);
            default:
                return notes;
        }
    }

    const resultNotes = searchNotes(filterNotes(notes));
    
    return(
        <List 
            notes={resultNotes} 
            fetching={fetching} />
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        notes: state.todoPage.notes,
        fetching: state.todoPage.fetching,
        search: state.todoPage.search,
        activeFilter: state.todoPage.activeFilter
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        requestNotesThunk
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ListСontainer);