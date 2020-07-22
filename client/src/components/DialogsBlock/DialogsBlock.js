import React from 'react';
import Loader from '../templates/Loader/Loader';
import ErrorAlert from '../templates/ErrorAlert/ErrorAlert';
import DialogsSearch from './DialogsSearch/DialogsSearch';
import DialogItem from './DialogItem/DialogItem';

const Dialogs = (props) => {

    const {
        dialogs,
        loading,
        selectedDialog,
        setSelectedDialogAC,
        searchField,
        viewSearchWindow,
        foundUsers,
        selectedNewId,
        firstMessage,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC
    } = props;

    const dialogsSearchProps = {
        loading,
        searchField,
        viewSearchWindow,
        foundUsers,
        selectedNewId,
        firstMessage,
        setSearchFieldAC,
        setViewSearchWindowAC,
        setSelectedNewIdAC,
        setFirstMessageAC
    };

    const dialogItemProps = {
        selectedDialog,
        setSelectedDialogAC
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