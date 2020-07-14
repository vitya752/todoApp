import axios from 'axios';

const notesApi = token => {

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const getNotes = async () => {
        return await template.get('/api/note');
    };

    const addNote = async (text) => {
        return await template.post('/api/note/add', {text});
    };

    const updateNote = async (noteId, important, done) => {
        return await template.patch('/api/note/update', {
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

export default notesApi;