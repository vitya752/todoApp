const SET_MESSAGE = 'SET_MESSAGE';
const PUSH_MESSAGE = 'PUSH_MESSAGE';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
const SET_OPEN_ONLINE_USERS = 'SET_OPEN_ONLINE_USERS';
const SET_ONLINE_USERS = 'SET_ONLINE_USERS';
const DELETE_USER = 'DELETE_USER';

const initialState = {
    openOnlineUsers: false,
    messageField: '',
    onlineUsers: [],
    messages: []
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MESSAGE: 
            return {
                ...state,
                messageField: action.messageField
            }
        case PUSH_MESSAGE: 
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.message
                ]
            }
        case CLEAR_MESSAGES:
            return {
                ...state,
                messages: []
            }
        case SET_OPEN_ONLINE_USERS:
            return {
                ...state,
                openOnlineUsers: !state.openOnlineUsers
            }
        case SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers
            }
        case DELETE_USER: {
            const idx = state.onlineUsers.findIndex(el => el._id === action.id);
            if(idx !== -1) {
                return {
                    ...state,
                    onlineUsers: [
                        ...state.onlineUsers.slice(0, idx),
                        ...state.onlineUsers.slice(idx + 1)
                    ]
                } 
            }
            return state;
        }
        default:
            return state;
    }
};

export const setMessageAC = messageField => {
    return {
        type: SET_MESSAGE,
        messageField
    };
};

export const pushMessageAC = message => {
    // const {senderId, author, avatar, text} = message;
    return {
        type: PUSH_MESSAGE,
        message
    };
};

export const clearMessagesAC = () => {
    return {
        type: CLEAR_MESSAGES
    };
};

export const setOpenOnlineUsersAC = () => {
    return {
        type: SET_OPEN_ONLINE_USERS
    };
};

export const setOnlineUsersAC = (onlineUsers) => {
    return {
        type: SET_ONLINE_USERS,
        onlineUsers
    };
};

export const deleteUserAC = id => {
    return {
        type: DELETE_USER,
        id
    }
};

export default reducer;