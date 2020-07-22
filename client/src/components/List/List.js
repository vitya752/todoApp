import React from 'react';
import ItemList from './ItemList/ItemListContainer';
import Loader from '../templates/Loader/Loader';

const List = ({ notes, fetching }) => {
    return(
        <div className="list-container mb-3">
            {notes.length ? 
            <ul className="list-group">
                {
                    notes.map(({_id, text, important, done}) => {
                        return <ItemList 
                                    text={text} 
                                    important={important} 
                                    done={done} 
                                    key={_id} 
                                    itemId={_id} />;
                    })
                }
            </ul>
            : fetching ? 
            <div className="alert alert-primary">
                <Loader />
            </div>
            :
            <div className="alert alert-warning" role="alert">
                Ваш список заметок пуст!
            </div>
            }
        </div>
    );
};

export default List;