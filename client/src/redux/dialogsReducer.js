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
    dialogs: [
        {
            id: 'dialogId1',
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            email: 'vitya752@ukr.net',
            text: 'Ахахахахахахахахахаахахахаххахаха)',
            my: false,
            new: 3
        },
        {
            id: 'dialogId2',
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            email: 'vitya752@ukr.net',
            text: 'Ахахахахахахахахахаахахахаххахаха)',
            my: true,
            new: 0
        },
        {
            id: 'dialogId3',
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            email: 'vitya752@ukr.net',
            text: 'Да ты гонишь бл*. Как так-то?)',
            my: false,
            new: 2
        }
    ],
    foundUsers: [
        {
            partnerId: 'partnerId1',
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            email: 'vitya752@ukr.net',
        },
        {
            partnerId: 'partnerId2',
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            email: 'vitya752@ukr.net',
        },
        {
            partnerId: 'partnerId3',
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            email: 'vitya752@ukr.net',
        }
    ],
    messages: [
        {
            senderId: 1,
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            author: 'vitya752',
            text: 'Привет. Шо ты?'
        },
        {
            senderId: 1,
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            author: 'vitya752',
            text: 'Я вот соскучился.'
        },
        {
            senderId: 1,
            avatar: 'https://www.pinclipart.com/picdir/big/136-1360593_donald-duck-clipart-sad-donald-duck-sad-png.png',
            author: 'vitya752',
            text: 'А ты?'
        }
    ]
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

export default reducer;