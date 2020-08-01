import React from 'react';

const DialogsSearchInput = (props) => {

    const {
        searchField,
        setSearchFieldAC,
        setViewSearchWindowAC
    } = props;

    return (
        <div className="input-group input-group-default">
            <input 
                placeholder="Найдите собеседника по email" 
                type="text" 
                className="form-control" 
                value={searchField}
                onChange={ (e) => setSearchFieldAC(e.target.value) }
                onFocus={ () => {setViewSearchWindowAC(true)} } />
        </div>
    )
};

export default DialogsSearchInput;