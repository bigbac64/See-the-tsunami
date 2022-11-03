import React from 'react';

/**
 * Composant qui anime un effet de vague en fond dela page
 * @returns {JSX.Element}
 * @constructor
 */
const Weaver = () => {
    return (
        <div className="Ocean">
            <div className="Weaver w1 Surface"></div>
            <div className="Weaver w2 Surface"></div>
        </div>
    );
};

export default Weaver;