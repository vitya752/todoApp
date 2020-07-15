import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import notesReducer from './notesReducer';
import chatReducer from './chatReducer';

const reducers = combineReducers({
    auth: authReducer,
    todoPage: notesReducer,
    chatPage: chatReducer,
    form: formReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

window.store = store;

export default store;