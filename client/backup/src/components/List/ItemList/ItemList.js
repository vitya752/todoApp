import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation, faCheckSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const ItemList = ({ text, handleClick, sending, important, done }) => {

    const buttons = [
        { id: 1, name: "important", classNames: "btn btn-primary", onClickFunction: handleClick, fontAwesomeIcon: faExclamation },
        { id: 2, name: "done", classNames: "btn btn-success btn-done", onClickFunction: handleClick, fontAwesomeIcon: faCheckSquare },
        { id: 3, name: "delete", classNames: "btn btn-danger", onClickFunction: handleClick, fontAwesomeIcon: faTrash }
    ];

    const renderButtons = buttons.map((item) => {
        return(
            <button
                name={item.name}
                type="button"
                className={item.classNames}
                key={item.id} 
                onClick={item.onClickFunction}
                disabled={sending} >
                <FontAwesomeIcon icon={item.fontAwesomeIcon} />
            </button>
        );
    });

    return (
        <li
            className={`list-group-item list-group-item--custom ${important && 'important'} ${done && 'doneItem'}`} >
            {text}
            <div className="float-right buttons-wrap">
                {renderButtons}
            </div>
        </li>
    )
};

export default ItemList;