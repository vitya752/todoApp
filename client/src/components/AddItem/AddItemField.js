import React from 'react';
import InputGroup from '../templates/InputGroup/InputGroup';

const AddItemField = ({ handleChangeField, newNote, sending, requestAddNoteThunk, token }) => {
    return (
        <div className="d-flex">
            <InputGroup 
                caption={'Новая запись'}
                handler={handleChangeField}
                value={newNote}
                name={'newItem'} />
            <button 
                type="submit" 
                className="btn btn-dark mb-3"
                disabled={sending || !newNote.length}
                onClick={() => requestAddNoteThunk(token, newNote)} 
                >
                Add
            </button>
        </div>
    )
};

export default AddItemField;