import React from 'react';

const Grid = ({children, nbColumn, size, level,options}) => {
    return (
        <div className="Grid" style={{
            gridTemplateColumns: `repeat(${nbColumn}, ${size === undefined ? '1fr' : size})`,
            marginLeft: `${10 * level}px`,
            ...options
        }}>
            {children}
        </div>
    );
};

export default Grid;