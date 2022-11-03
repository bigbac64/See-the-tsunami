import React from 'react';

/**
 * Composant disposant ses enfant en grille, l'utilisation du composant <b>Item</b> est recommandé
 * @param children Les composants enfant à afficher
 * @param nbColumn le nombre de colonne à afficher
 * @param size la taille de chaque colonne (par défaut : 1fr)
 * @param level Niveau d'indentation pour améliorer l'affichage d'un objet
 * @param options les styles a ajouter au div
 * @returns {JSX.Element}
 * @constructor
 */
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