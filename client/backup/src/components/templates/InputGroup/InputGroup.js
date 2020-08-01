import React from 'react';

const InputGroup = ({ caption, handler, value, name, readonly }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">{caption}</span>
            </div>
            <input 
                type="text" 
                className="form-control"
                onChange={handler}
                value={value}
                name={name}
                readOnly={readonly ? true : false} />
        </div>
    )
};

export default InputGroup;