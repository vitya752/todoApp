import React from 'react';

import './DialogsSearch.css';
import DialogsSearchInput from './DialogsSearchInput/DialogsSearchInput';
import DialogsFound from './DialogsFound/DialogsFound';

const DialogsSearch = (props) => {

    const {
        token,
        searchField,
        viewSearchWindow,
        foundUsers,
        loading,
        firstMessage,
        selectedNewId,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        findUsersThunk
    } = props;

    const dialogsSearchInputProps = {
        searchField,
        setSearchFieldAC,
        setViewSearchWindowAC
    };

    const dialogsFoundProps = {
        token,
        searchField,
        viewSearchWindow,
        foundUsers,
        loading,
        firstMessage,
        selectedNewId,
        setSelectedNewIdAC,
        setFirstMessageAC,
        setViewSearchWindowAC,
        findUsersThunk
    };

    return (
        <div className="dialogs__search">
            <DialogsSearchInput {...dialogsSearchInputProps} />
            <DialogsFound {...dialogsFoundProps} />
        </div>
    )
};

export default DialogsSearch;