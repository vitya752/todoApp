import React from 'react';

const ErrorAlert = ({ type, children }) => {
    return (
        <div className={`alert alert-${type}`}>
            {children}
        </div>
    )
};

export default ErrorAlert;