import React from 'react';

const Search = ({ search, handleChangeSearch }) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">Search</span>
            </div>
            <input 
                type="text" 
                className="form-control"
                onChange={handleChangeSearch}
                value={search} 
                />
        </div>
    )
};

export default Search;