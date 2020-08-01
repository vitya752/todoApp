import React, { useContext } from 'react';

import { DialogsContext } from 'context';

const DialogsSearchInput = () => {
    
    const {
        searchField,
        setSearchFieldAC,
        setViewSearchWindowAC
    } = useContext(DialogsContext);

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