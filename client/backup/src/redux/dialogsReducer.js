import { toast } from "react-toastify";

import { dialogsApi, messagesApi, usersApi } from "api";
import { _transformDialogs, _transformMessages, _transformFoundUsers } from 'utils/transformData';

const SET_LOADING = 'SET_LOADING';
const SET_VIEW_SEARCH_WINDOW = 'SET_VIEW_SEARCH_WINDOW';
const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD';
const SET_SELECTED_NEW_ID = 'SET_CHECKED_NEW_ID';
const SET_FIRST_MESSAGE = 'SET_FIRST_MESSAGE';
const SET_SELECTED_DIALOG = 'SET_SELECTED_DIALOG';
const SET_DIALOGS = 'SET_DIALOGS';
const PUSH_TO_DIALOGS = 'PUSH_TO_DIALOGS';
const SET_FOUND_USERS = 'SET_FOUND_USERS';
const SET_MESSAGES = 'SET_MESSAGES';
const PUSH_TO_MESSAGES = 'PUSH_TO_MESSAGES';

const initialState = {
    loading: false,
    viewSearchWindow: false,
    searchField: '',
    selectedNewId: null,
    firstMessage: '',
    selectedDialog: null,
    dialogs: [],
    foundUsers: [],
    messages: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_LOADING: 
            return {
                ...state,
                loading: action.loading
            }
        case SET_VIEW_SEARCH_WINDOW:
            return {
                ...state,
                viewSearchWindow: action.viewSearchWindow
            }
        case SET_SEARCH_FIELD: 
            return {
                ...state,
                searchField: action.searchField
            }
        case SET_SELECTED_NEW_ID: 
            return {
                ...state,
                selectedNewId: action.selectedNewId
            }
        case SET_FIRST_MESSAGE: 
            return {
                ...state,
                firstMessage: action.firstMessage
            }
        case SET_SELECTED_DIALOG:
            return {
                ...state,
                selectedDialog: action.selectedDialog
            }
        case SET_DIALOGS:
            return {
                ...state,
                dialogs: action.dialogs
            }
        case PUSH_TO_DIALOGS:
            return {
                ...state,
                dialogs: [
                    action.dialog,
                    ...state.dialogs
                ]
            }
        case SET_FOUND_USERS:
            return {
                ...state,
                foundUsers: action.foundUsers
            }
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.messages
            }
        case PUSH_TO_MESSAGES:
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.message
                ]
            }
        default:
            return state;
    }
};

export const setLoadingAC = payload => {
    return {
        type: SET_LOADING,
        loading: payload
    }
};

export const setViewSearchWindowAC = payload => {
    return {
        type: SET_VIEW_SEARCH_WINDOW,
        viewSearchWindow: payload
    }
};

export const setSearchFieldAC = payload => {
    return {
        type: SET_SEARCH_FIELD,
        searchField: payload
    }
};

export const setSelectedNewIdAC = payload => {
    return {
        type: SET_SELECTED_NEW_ID,
        selectedNewId: payload
    }
};

export const setFirstMessageAC = payload => {
    return {
        type: SET_FIRST_MESSAGE,
        firstMessage: payload
    }
};

export const setSelectedDialogAC = payload => {
    return {
        type: SET_SELECTED_DIALOG,
        selectedDialog: payload
    }
};

export const setDialogsAC = payload => {
    return {
        type: SET_DIALOGS,
        dialogs: payload
    }
};

export const pushToDialogsAC = payload => {
    return {
        type: PUSH_TO_DIALOGS,
        dialog: payload
    }
};

export const setFoundUsersAC = payload => {
    return {
        type: SET_FOUND_USERS,
        foundUsers: payload
    }
}

export const setMessagesAC = payload => {
    return {
        type: SET_MESSAGES,
        messages: payload
    }
};

export const pushToMessagesAC = payload => {
    return {
        type: PUSH_TO_MESSAGES,
        message: payload
    }
};

export const getDialogsThunk = (token, userId) => {
    return async dispatch => {
        try {
            dispatch(setLoadingAC(true));
            const api = dialogsApi(token);
            const data = await api.getDialogs();
            const transformDialogs = _transformDialogs({dialogs: data.data.dialogs, userId});
            dispatch(setDialogsAC(transformDialogs));
            dispatch(setLoadingAC(false));
        } catch(e) {
            requestError(setLoadingAC(false), e, dispatch);
        }
    };
};

export const getMessagesFromDialogThunk = (token, dialogId, participants) => {
    return async dispatch => {
        try {
            dispatch(setLoadingAC(true));
            dispatch(setSelectedDialogAC(dialogId));
            dispatch(setMessagesAC([]));
            const api = messagesApi(token);
            const data = await api.getMessages(dialogId);
            const transformMessages = _transformMessages({
                messages: data.data.messages,
                participants
            });
            dispatch(setMessagesAC(transformMessages));
            dispatch(setLoadingAC(false));
        } catch(e) {
            requestError(setLoadingAC(false), e, dispatch);
        }
    };
};

export const findUsersThunk = (token, reqEmail) => {
    return async dispatch => {
        try {
            dispatch(setFoundUsersAC([]));
            dispatch(setLoadingAC(true));
            const api = usersApi(token);
            const data = await api.findUsers(reqEmail);
            const transformFoundUsers = _transformFoundUsers({
                foundUsers: data.data.foundUsers
            });
            dispatch(setFoundUsersAC(transformFoundUsers));
            dispatch(setLoadingAC(false));
        } catch(e) {
            requestError(setLoadingAC(false), e, dispatch);
        }
    };
};


const requestError = (action, e, dispatch) => {
    dispatch(action);
    toast(e.response.data.message);
};

export default reducer;