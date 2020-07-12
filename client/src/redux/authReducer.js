import { authApi, settingsApi } from "../api";
import { toast } from "react-toastify";

const FETCHING = 'FETCHING';
const SET_AUTH = 'SET_AUTH';
const SET_FIELD_AUTH_FORM = 'SET_FIELD_AUTH_FORM';
const SET_SETTINGS = 'SET_SETTINGS';

const initialState = {
    userId: null,
    token: null,
    email: null,
    nickname: null,
    avatar: null,
    isAuth: false,
    fetching: false,
    form: {
        email: '',
        pass: ''
    }
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING:
            return {
                ...state,
                fetching: action.fetching
            }
        case SET_AUTH: 
            return {
                ...state,
                userId: action.userId,
                token: action.token,
                email: action.email,
                nickname: action.nickname,
                avatar: action.avatar,
                isAuth: action.token ? true : false
            }
        case SET_FIELD_AUTH_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    ...action.payload
                }
            }
        }
        case SET_SETTINGS: {
            return {
                ...state,
                ...action.payload
            }
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
}

export const setAuthAC = (obj) => {
    const {userId = null, nickname = null, avatar = null, email = null, token = null} = obj;
    return {
        type: SET_AUTH,
        userId,
        token,
        nickname,
        avatar,
        email
    }
};

export const setAuthFormAC = (name, value) => {
    return {
        type: SET_FIELD_AUTH_FORM,
        payload: {
            [name]: value
        }
    }
};

export const setSettingsAC = (name, value) => {
    return {
        type: SET_SETTINGS,
        payload: {
            [name]: value
        }
    }
};

export const requestLoginThunk = (email, pass) => {
    return async (dispatch) => {
        try{
            dispatch(fetchingAC(true));
            const api = authApi();
            const data = await api.login(email, pass);
            if(data.statusText === 'OK') {
                const {userId, email, nickname, avatar, token, message} = data.data;
                dispatch(setAuthAC({userId, nickname, avatar, email, token}));
                dispatch(fetchingAC(false));
                toast(message);
            }
        } catch(e) {
            dispatch(fetchingAC(false));
            toast(e.response.data.message);
        }
    }
};

export const requestRegisterThunk = (email, pass) => {
    return async (dispatch) => {
        try {
            dispatch(fetchingAC(true));
            const api = authApi();
            const data = await api.register(email, pass)
            if(data.statusText === 'Created') {
                toast(data.data.message);
                dispatch(fetchingAC(false));
            }
        } catch(e) {
            dispatch(fetchingAC(false));
            toast(e.response.data.message);
        }
    }
};

export const deleteAccThunk = ({token, userId}) => {
    return async dispatch => {
        try {
            dispatch(fetchingAC(true));
            const api = settingsApi(token);
            const data = await api.deleteAcc(userId);
            if(data.statusText === 'Accepted') {
                const {message} = data.data;
                toast(message);
                dispatch(fetchingAC(false));
                dispatch(setAuthAC({}));
                dispatch(setAuthFormAC('email', ''));
                dispatch(setAuthFormAC('pass', ''));
            }
        } catch(e) {
            dispatch(fetchingAC(false));
            // toast(e.response.data.message);
        }
    };
};

export const updateSettingsThunk = ({token, userId, nickname, avatar}) => {
    return async dispatch => {
        try {
            dispatch(fetchingAC(true));
            const api = settingsApi(token);
            const data = await api.setSettings(userId, nickname, avatar);
            if(data.statusText === 'Accepted') {
                const {message} = data.data;
                dispatch(fetchingAC(false));
                toast(message);
            }
        } catch(e) {
            dispatch(fetchingAC(false));
            toast(e.response.data.message);
        }
    };
};

export default reducer;