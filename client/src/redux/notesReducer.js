import { toast } from "react-toastify";

import { notesApi } from "api";

const FETCHING = 'FETCHING';
const SENDING = 'SENDING';
const SET_NOTES = 'SET_NOTES';
const SET_NEW_NOTE = 'SET_NEW_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';
const SET_SEARCH = 'SET_SEARCH';
const SET_FILTER = 'SET_FILTER';

const initialState = {
    fetching: false,
    sending: false,
    notes: [],
    newNote: '',
    search: '',
    activeFilter: 'all'
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING: 
            return {
                ...state,
                fetching: action.fetching
            }
        case SET_NOTES: 
            return {
                ...state,
                notes: action.notes
            }
        case SENDING: 
            return {
                ...state,
                sending: action.sending
            }
        case SET_NEW_NOTE:
            return {
                ...state,
                newNote: action.newNote
            }
        case UPDATE_NOTE:
            return updateNote(state, action.note, action.noteId);
        case SET_SEARCH: 
            return {
                ...state,
                search: action.search
            }
        case SET_FILTER: 
            return {
                ...state,
                activeFilter: action.newFilter
            }
        default: 
            return state;
    }
};

export const fetchingAC = (fetching) => {
    return {
        type: FETCHING,
        fetching
    }
};

export const sendingAC = (sending) => {
    return {
        type: SENDING,
        sending
    }
}

export const setNotesAC = (notes) => {
    return {
        type: SET_NOTES,
        notes
    }
};

export const setNewNoteAC = (newNote) => {
    return {
        type: SET_NEW_NOTE,
        newNote
    }
};

export const updateNoteAC = (note, noteId) => {
    return {
        type: UPDATE_NOTE,
        note,
        noteId
    }
};

export const setSearchAC = (search) => {
    return {
        type: SET_SEARCH,
        search
    }
};

export const setFilterAC = (newFilter) => {
    return {
        type: SET_FILTER,
        newFilter
    }
}

export const requestNotesThunk = (token) => {
    return async (dispatch) => {
        try {
            dispatch(fetchingAC(true));
            const api = notesApi(token);
            const data = await api.getNotes();
            if(data.statusText === 'OK') {
                dispatch(fetchingAC(false));
                dispatch(setNotesAC(data.data.notes));
                toast(data.data.message);
            } else {
                toast('Ошибка!');
            }
        } catch(e) {
            requestError(fetchingAC(false), e, dispatch);
        }
    }
};

export const requestAddNoteThunk = (token, text) => {
    return async (dispatch) => {
        try{
            dispatch(sendingAC(true));
            const api = notesApi(token);
            const data = await api.addNote(text);
            if(data.statusText === 'Created') {
                dispatch(requestNotesThunk(token));
                dispatch(setNewNoteAC(''));
                dispatch(sendingAC(false));
                toast(data.data.message);
            } else {
                toast('Ошибка!');
            }
        } catch(e) {
            requestError(sendingAC(false), e, dispatch);
        }
    };
};

export const requestUpdateNoteThunk = (token, noteId, important, done) => {
    return async (dispatch) => {
        try {
            dispatch(sendingAC(true));
            const api = notesApi(token);
            const data = await api.updateNote(noteId, important, done);
            if(data.statusText === 'Accepted') {
                dispatch(updateNoteAC(data.data.note, noteId));
                dispatch(sendingAC(false));
                toast(data.data.message);
            } else {
                toast('Ошибка!');
            }
        } catch(e) {
            requestError(sendingAC(false), e, dispatch);
        }
    };
};

export const requestDeleteNoteThunk = (token, noteId) => {
    return async (dispatch) => {
        try {
            dispatch(sendingAC(true));
            const api = notesApi(token);
            const data = await api.deleteNote(noteId);
            console.log(data);
            if(data.statusText === 'Accepted') {
                dispatch(updateNoteAC(null, noteId));
                dispatch(sendingAC(false));
                toast(data.data.message);
            } else {
                toast('Ошибка!');
            }
        } catch(e) {
            requestError(sendingAC(false), e, dispatch);
        }
    };
};

const requestError = (action, e, dispatch) => {
    dispatch(action);
    toast(e.response.data.message);
};

const updateNote = (state, note, noteId) => {
    const idx = state.notes.findIndex((el) => el._id === noteId);
    if(idx !== -1) {
        if(note !== null) {
            return {
                ...state,
                notes: [
                    ...state.notes.slice(0, idx),
                    note,
                    ...state.notes.slice(idx + 1)
                ]
            }
        }
        return {
            ...state,
            notes: [
                ...state.notes.slice(0, idx),
                ...state.notes.slice(idx + 1)
            ]
        }
    }
};

export default reducer;