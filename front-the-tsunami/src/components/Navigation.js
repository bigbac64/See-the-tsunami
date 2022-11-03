import React from 'react';
import {NavLink} from "react-router-dom";

/**
 * /!\ Composant Inutile pour la version <b>0.2.4</b> de front-the-tsunami mais peut etre utile dans une version ulterieur /!\
 * Composant servant à afficher un menu de navigation
 * @returns {JSX.Element}
 * @constructor
 */
const Navigation = () => {
    return (
        <div className="Navigation">
            <ul>
                <NavLink to="/" className={(nav)=>(nav.isActive ? "nav-active" : "")}>
                    <li className="Navigation-Button">Accueil</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;