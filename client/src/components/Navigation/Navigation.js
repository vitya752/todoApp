import React from 'react';
import Search from './Search/SearchContainer';
import Filter from './Filter/FilterContainer';

const Navigation = () => {
    return(
        <div className="navigation-panel mt-3 d-flex">
            <Search />
            <Filter />
        </div>
    );
};

export default Navigation;