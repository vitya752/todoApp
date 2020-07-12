import axios from 'axios';

export const authApi = () => {

    const login = async (email, password) => {
        return await axios.post('/api/auth/login', {email, password});
    };

    const register = async (email, password) => {
        return await axios.post('/api/auth/register', {email, password});
    };

    return {
        login,
        register
    }
};

export const settingsApi = token => {

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const setSettings = async (userId, nickname, avatar) => {
        return await template.post('/api/settings/update', { userId, nickname, avatar });
    };

    const deleteAcc = async (userId) => {
        return await template.post('/api/settings/delete', {userId});
    };

    return {
        setSettings,
        deleteAcc
    }
};

export const notesApi = token => {

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const getNotes = async () => {
        return await template.get('/api/note/');
    };

    const addNote = async (text) => {
        return await template.post('/api/note/add', {text});
    };

    const updateNote = async (noteId, important, done) => {
        return await template.post('/api/note/update', {
            id: noteId,
            important,
            done
        });
    };

    const deleteNote = async (noteId) => {
        return await template.post('/api/note/delete', {id: noteId});
    }

    return {
        getNotes,
        addNote,
        updateNote,
        deleteNote
    }
};

window.notesApi = notesApi;