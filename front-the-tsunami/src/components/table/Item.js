import React from 'react';

const Item = ({children, line, column, options}) => {
    return (
        <div className="Item"
            style={{
                gridColumn: column,
                gridRow: line,
                ...options
            }}
        >
            {children}
        </div>
    );
};

export default Item;