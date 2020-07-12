import React from 'react';

const Filter = ({ handleChangeFilter, activeFilter }) => {

    const filterButtons = [
        { name: 'all', label: 'All' },
        { name: 'active', label: 'Active' },
        { name: 'done', label: 'Done' }
    ];

    const buttons = filterButtons.map(({name, label}) => {
        const isActive = activeFilter === name;
        return(
            <button 
                name={name}
                key={name}
                className={`btn btn-dark ${isActive && 'active'}`}
                onClick={handleChangeFilter}>
                {label}
            </button>
        );
    });

    return (
        <div className="btn-group mb-3">
            {buttons}
        </div>
    )
};

export default Filter;