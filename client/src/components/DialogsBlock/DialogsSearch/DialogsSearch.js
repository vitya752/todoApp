import React from 'react';

import './DialogsSearch.css';
import DialogsSearchInput from './DialogsSearchInput/DialogsSearchInput';
import DialogsFound from './DialogsFound/DialogsFound';

const DialogsSearch = () => {
    return (
        <div className="dialogs__search">
            <DialogsSearchInput />
            <DialogsFound />
        </div>
    )
};

export default DialogsSearch;