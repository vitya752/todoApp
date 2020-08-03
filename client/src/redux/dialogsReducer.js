import { toast } from "react-toastify";

import { dialogsApi, messagesApi, usersApi } from "api";
import { _transformDialogs, _transformMessages, _transformFoundUsers } from 'utils/transformData';
import { formatDate } from "utils/formatDate";

const SET_LOADING = 'SET_LOADING';
const SET_VIEW_SEARCH_WINDOW = 'SET_VIEW_SEARCH_WINDOW';
const SET_SEARCH_FIELD = 'SET_SEARCH_FIELD';
const SET_SELECTED_NEW_ID = 'SET_CHECKED_NEW_ID';
const SET_FIRST_MESSAGE = 'SET_FIRST_MESSAGE';
const SET_SELECTED_DIALOG = 'SET_SELECTED_DIALOG';
const SET_DIALOGS = 'SET_DIALOGS';
const UPDATE_DIALOG = 'UPDATE_DIALOG';
const SET_FOUND_USERS = 'SET_FOUND_USERS';
const SET_MESSAGES = 'SET_MESSAGES';
const PUSH_TO_MESSAGES = 'PUSH_TO_MESSAGES';
const UPDATE_READSTATUS = 'UPDATE_READSTATUS';
const SET_IS_TYPING = 'SET_IS_TYPING';

const initialState = {
    loading: false,
    viewSearchWindow: false,
    searchField: '',
    selectedNewId: null,
    firstMessage: '',
    selectedDialog: null,
    dialogs: [],
    foundUsers: [],
    messages: [],
    isTyping: {
        status: false,
        writersName: ''
    }
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
        case UPDATE_DIALOG: {
            const idx = state.dialogs.findIndex(item => item.id === action.dialog.id);
            const dialog = {
                ...state.dialogs[idx],
                ...action.dialog,
                unreadMessages: state.dialogs[idx].unreadMessages + 1 
            };

            if(idx !== -1) {
                return {
                    ...state,
                    dialogs: [
                        dialog,
                        ...state.dialogs.slice(0, idx),
                        ...state.dialogs.slice(idx + 1)
                    ]
                }
            }

            return state;
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
        case UPDATE_READSTATUS: {
            const idx = state.dialogs.findIndex(item => item.id === action.payload);
            const dialogs = [...state.dialogs];

            if(idx !== -1) {
                dialogs[idx].unreadMessages = 0;
                return {
                    ...state,
                    dialogs
                }
            }
            return state;
        }
        case SET_IS_TYPING: 
            return {
                ...state,
                isTyping: {
                    status: action.isTyping.status,
                    writersName: action.isTyping.writersName
                }
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

export const updateDialogAC = payload => {
    return {
        type: UPDATE_DIALOG,
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

export const updateReadstatusAC = payload => {
    return {
        type: UPDATE_READSTATUS,
        payload
    }
};

export const setIsTypingAC = payload => {
    return {
        type: SET_IS_TYPING,
        isTyping: payload
    }
}

export const createDialogThunk = (token, userId, partnerId, text) => {
    return async dispatch => {
        try {
            dispatch(setLoadingAC(true));
            const api = dialogsApi(token);
            await api.createDialog(partnerId, text);
            dispatch(setLoadingAC(false));
            dispatch(setViewSearchWindowAC(false));
            dispatch(setSelectedNewIdAC(''));
            dispatch(setSearchFieldAC(''));
            dispatch(setFirstMessageAC(''));
            dispatch(setFoundUsersAC([]));
        } catch(e) {
            requestError(setLoadingAC(false), e, dispatch);
        }
    };
}

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

export const sendMessageThunk = (token, dialogId, text, socket) => {
    return async dispatch => {
        try {
            const api = messagesApi(token);
            await api.sendMessage(dialogId, text);
        } catch(e) {
            requestError(setLoadingAC(false), e, dispatch);
        }
    }
};

export const updateDialogThunk = (newDialog, userId) => {
    return dispatch => {
        try {
            const { dialogId, text, date, partnerId } = newDialog;
            const result = {
                id: dialogId,
                text: text,
                fulldate: date,
                my: userId !== partnerId,
                date: formatDate({dateFromBase: date, type: 'dialogs'})
            };
            if(userId !== partnerId) {
                result.unreadMessages = 1;
            }
            dispatch(updateDialogAC(result));
        } catch(e) {
            requestError(setLoadingAC(false), e, dispatch);
        }
    };
};

export const pushToMessagesThunk = (message) => {
    return dispatch => {
        try {
            const { date } = message;
            const newMessage = {
                ...message,
                fullDate: date,
                date: formatDate({dateFromBase: date, type: 'messages'})
            };
            dispatch(pushToMessagesAC(newMessage));
        } catch(e) {
            requestError(setLoadingAC(false), e, dispatch);
        }
    };
}

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