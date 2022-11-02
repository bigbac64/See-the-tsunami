import React from 'react';
import {NavLink} from "react-router-dom";

const Navigation = () => {
    return (
        <div className="Navigation">
            <ul>
                <NavLink to="/" className={(nav)=>(nav.isActive ? "nav-active" : "")}>
                    <li className="Navigation-Button">Accueil</li>
                </NavLink>
                <NavLink to="/result" className={(nav)=>(nav.isActive ? "nav-active" : "")}>
                    <li className="Navigation-Button">Result</li>
                </NavLink>
            </ul>
        </div>
    );
};

export default Navigation;