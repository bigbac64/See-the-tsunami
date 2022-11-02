import React from 'react';
import DropdownMenu from "./dropdown/DropdownMenu";
import DropdownItem from "./dropdown/DropdownItem";
import Grid from "./table/Grid";
import Item from "./table/Item";

/**
 *
 * @param report
 * @returns {JSX.Element}
 * @constructor
 */
const ResultTsunami = ({report}) => {

    const TSUNAMI_STATUS = {
        success:"SUCCEEDED",
        partial:"PARTIALLY_SUCCEEDED",
        fail:"FAILED"
    };


    /**
     * Affiche une icone selon le resultat obtenu du rapport
     * @param report
     * @returns {JSX.Element}
     */
    function iconeResult(report){
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
     function drawObj(title, data, level){
        return(
              <DropdownMenu name={title} size="20px" level={level}>
              {
                  Object.keys(data).map(k=>{
                      let type = Object.prototype.toString.call(data[k]);
                      if ( type === '[object Object]' || type === '[object Array]'){
                          return drawObj(k, data[k], level+1);
                      }

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

    /* En cas d'erreur lors du rapport de tsunami */
    if(report.scanStatus === TSUNAMI_STATUS.fail)
        return (
            <div className="ResultTsunami">
                {iconeResult(report)}
                <div className="ResultList">
                    {drawObj("Rapport",report,0)}
                </div>
            </div>
        );


    return (
        <div className="ResultTsunami">
            {iconeResult(report)}
            <div className="ResultList">
                {drawObj("Rapport",report,0)}
            </div>
            <button onClick={downloadJSON}>Télécharger le rapport complet</button>
        </div>
    );
};

export default ResultTsunami;