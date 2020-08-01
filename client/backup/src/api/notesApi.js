import axios from 'axios';

const notesApi = token => {

    const url = '/api/note';

    const template = axios.create({
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const getNotes = async () => {
        return await template.get(`${url}`);
    };

    const addNote = async (text) => {
        return await template.post(`${url}/add`, {text});
    };

    const updateNote = async (noteId, important, done) => {
        return await template.patch(`${url}/update`, {
            id: noteId,
            important,
            done
        });
    };

    const deleteNote = async (noteId) => {
        return await template.post(`${url}/delete`, {id: noteId});
    }

    return {
        getNotes,
        addNote,
        updateNote,
        deleteNote
    }
};

export default notesApi;