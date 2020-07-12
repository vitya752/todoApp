import React from 'react';
import Navigation from '../components/Navigation/Navigation'
import List from '../components/List/ListСontainer';
import AddItemField from '../components/AddItem/AddItemFieldContainer';

const TodoPage = () => {

    return (
        <>
            <Navigation />
            <List />
            <AddItemField />
        </>
    )
};

export default TodoPage;