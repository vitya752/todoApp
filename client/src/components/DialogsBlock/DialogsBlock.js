import React, { useContext } from 'react';

import './DialogBlock.css';
import Loader from 'components/templates/Loader/Loader';
import ErrorAlert from 'components/templates/ErrorAlert/ErrorAlert';
import DialogsSearch from './DialogsSearch/DialogsSearch';
import DialogItem from './DialogItem/DialogItem';
import { DialogsContext } from 'context';


const Dialogs = ({ dialogWindowStatus }) => {
    
    const { dialogs, loading } = useContext(DialogsContext);

    return (
        <div className={`dialogs ${dialogWindowStatus ? 'dialogs_mobile-active' : ''}`} >
            <DialogsSearch />
            {
                dialogs.length ?
                <ul className="dialogs__list">
                    {
                        dialogs.map(item => {
                            return (
                                <DialogItem 
                                    key={item.id}
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