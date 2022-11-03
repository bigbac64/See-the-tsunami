import React from 'react';
import DropdownMenu from "./dropdown/DropdownMenu";
import Grid from "./table/Grid";
import Item from "./table/Item";

/**
 * Composant permettant d'afficher le contenu d'un rapport de tsunami et de le téléchrager
 * @param report objet rassemblant toutes les informations concernant le rapport de tsunami
 * @param state L'etat du report afin de modifier le contenu du rapport dynamiquement (voir backToSearch)
 * @returns {JSX.Element}
 * @constructor
 */
const ResultTsunami = ({report, state}) => {

    const TSUNAMI_STATUS = {
        success:"SUCCEEDED",
        partial:"PARTIALLY_SUCCEEDED",
        fail:"FAILED"
    };

    /**
     * Permet de supprimer le contenu du rapport afin de revenir au composant AdressSearch (/!\ procédure non conventionnel)
     * @param e
     */
    function backToSearch(e){
        state({});
    }

    /**
     * Affiche une icone selon le resultat obtenu du rapport
     * @param report
     * @returns {JSX.Element}
     */
    function iconeResult(report){
        if(!report.hasOwnProperty('scanStatus'))
            return (<img className="IconeResult" src={"./err.svg"}></img>);

        if(report.scanStatus === TSUNAMI_STATUS.fail)
            return (<img className="IconeResult" src={"./err.svg"}></img>);

        if(Object.keys(report.fullDetectionReports).length !== 0)
            return (<img className="IconeResult" src={"./warn.svg"}></img>);

        return (<img className="IconeResult" src={"./sucess.svg"}></img>);
    }

    /**
     * Permet de télécharger le rapport depuis le navigateur
     */
    function downloadJSON(){
        const fileName = "report-tsunami";
        const json = JSON.stringify(report, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    /**
     * fonction récursive qui met en forme une liste de données
     * @param title le titre de la liste de données
     * @param data la donnée a listé
     * @param level determine le niveau d'indentation
     */
     function drawObj(title, data, level, deploy=false){
        return(
              <DropdownMenu name={title} size="20px" level={level} deploy={deploy}>
              {
                  // parcoure le contenu de data
                  Object.keys(data).map(k=>{
                      let type = Object.prototype.toString.call(data[k]);

                      // Si c'est un objet ou un array on dessine sont contenu
                      if ( type === '[object Object]' || type === '[object Array]'){
                          return drawObj(k, data[k], level+1);
                      }

                      // dessine sous forme de tableau le contenu clé, valeur
                      return (
                          <Grid level={level} options={{gridTemplateColumns: "0.2fr 1fr"}}>
                              <Item options={{fontSize:"20px"}}>{k}</Item>
                              <Item options={{fontWeight:"bold"}}>{data[k]}</Item>
                          </Grid>);
                  })
              }
              </DropdownMenu>
        );
    }

    return (
        <div className="ResultTsunami">
            <button onClick={backToSearch} style={{width:"400px", alignSelf:"center"}}>Revenir a l'étape précédente</button>
            {iconeResult(report)}
            <div className="ResultList">
                {drawObj("Rapport",report,0, true)}
            </div>
            <button onClick={downloadJSON}>Télécharger le rapport complet</button>
        </div>
    );
};

export default ResultTsunami;