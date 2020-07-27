import React from 'react';

import './DialogBlock.css';
import Loader from 'components/templates/Loader/Loader';
import ErrorAlert from 'components/templates/ErrorAlert/ErrorAlert';
import DialogsSearch from './DialogsSearch/DialogsSearch';
import DialogItem from './DialogItem/DialogItem';

const Dialogs = (props) => {

    const {
        token,
        dialogs,
        loading,
        selectedDialog,
        searchField,
        viewSearchWindow,
        foundUsers,
        selectedNewId,
        firstMessage,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC,

        getMessagesFromDialogThunk,
        findUsersThunk
    } = props;

    const dialogsSearchProps = {
        token,
        loading,
        searchField,
        viewSearchWindow,
        foundUsers,
        selectedNewId,
        firstMessage,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC,
        findUsersThunk
    };

    const dialogItemProps = {
        token, 
        selectedDialog,
        getMessagesFromDialogThunk
    }; 

    return (
        <div className="dialogs" >
            <DialogsSearch {...dialogsSearchProps} />
            {
                dialogs.length ?
                <ul className="dialogs__list">
                    {
                        dialogs.map(item => {
                            return (
                                <DialogItem 
                                    key={item.id}
                                    {...dialogItemProps}
                                    item={item}
                                 />
                            )
                        })
                    }
                </ul> 
                : loading ? 
                <Loader /> 
                : 
                <ErrorAlert type="warning" >
                    Диалогов нету. Найдите собеседника.
                </ErrorAlert>
            }
        </div>
    )
};

export default Dialogs;