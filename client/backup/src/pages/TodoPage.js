import React from 'react';

import List from 'components/List/ListСontainer';
import Navigation from 'components/Navigation/Navigation'
import AddItemField from 'components/AddItem/AddItemFieldContainer';

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