import React from 'react';

import DialogsSearchInput from './DialogsSearchInput/DialogsSearchInput';
import DialogsFound from './DialogsFound/DialogsFound';

const DialogsSearch = (props) => {

    const {
        searchField,
        viewSearchWindow,
        foundUsers,
        loading,
        firstMessage,
        selectedNewId,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC
    } = props;

    const dialogsFoundProps = {
        searchField,
        viewSearchWindow,
        foundUsers,
        loading,
        firstMessage,
        selectedNewId,
        setSelectedNewIdAC,
        setFirstMessageAC,
        setViewSearchWindowAC
    };

    const dialogsSearchInputProps = {
        searchField,
        setSearchFieldAC,
        setViewSearchWindowAC
    };

    return (
        <div className="dialogs__search">
            <DialogsSearchInput {...dialogsSearchInputProps} />
            <DialogsFound {...dialogsFoundProps} />
        </div>
    )
};

export default DialogsSearch;