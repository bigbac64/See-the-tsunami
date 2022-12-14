import React, {useState} from 'react';

/**
 * DropdownMenu est un composant qui permet de générer une liste déroulante afin d'afficher ou de cacher des données
 * @param children Composant à imbriquer dans la liste déroulante
 * @param name Nom qui resteras afficher
 * @param size Taille du texte qui resteras affiché
 * @param level Indente le contenu de 10 pixel par level
 * @param deploy Défini si les composant enfant doivent etre visible ou non au départ
 * @param options les styles a ajouter au div
 * @returns {JSX.Element}
 * @constructor
 */
const DropdownMenu = ({children, name, size, level, deploy, options}) => {
    const [classes, setClasses] = useState("Hidden")
    const [source, setSource] = useState("./left.svg")

    useState(()=>{
        setClasses(deploy ? "" : "Hidden");
    })

    /**
     * Handler permettant d'afficher les composants enfant ou non
     * @param e
     */
    function menuOnClick(e){
        const cls = classes === "";
        const src = source === "./left.svg";

        setClasses(cls ? "Hidden" : "");
        setSource(src ? "./down.svg" : "./left.svg")
    }

    return (
        <div className="DropdownMenu" style={{marginLeft: `${10 * level}px`, ...options }}>
            <div onClick={menuOnClick} className="Interact">

                {/*Icone de l'etat d'affichage de la liste*/}
                <img alt=">"className="Icone" style={{
                    marginBottom: `calc( ${size} / 20 )`,
                    height: `calc( ${size} / 2 )`
                }} src={source} />

                {/*Le texte qui resteras affiché*/}
                <span style={{fontSize: size}}>{name}</span>
            </div>

            <div className={classes}>
                {children}
            </div>
        </div>
    );
};

export default DropdownMenu;