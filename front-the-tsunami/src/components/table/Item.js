import React from 'react';

/**
 * Composant enfant de <b>Grid</b> - affiche dans une case de la grille parent les composant enfant de ce composant
 * @param children Les composants enfant à afficher
 * @param line la position sur l'axe des lignes (non renseigné = automatique)
 * @param column la position sur l'axe des colonne (non renseigné = automatique)
 * @param options les styles a ajouter au div
 * @returns {JSX.Element}
 * @constructor
 */
const Item = ({children, line, column, options}) => {
    return (
        <div className="Item"
            style={{
                gridColumn: column,
                gridRow: line,
                alignSelf: "end",
                ...options
            }}
        >
            {children}
        </div>
    );
};

export default Item;