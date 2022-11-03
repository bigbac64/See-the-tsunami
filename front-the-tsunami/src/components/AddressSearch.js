import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import Loading from "./Loading";
import ResultTsunami from "./ResultTsunami";
import Grid from "./table/Grid";
import Item from "./table/Item";
import DropdownMenu from "./dropdown/DropdownMenu";

/**
 * Composant qui génere un formulaire pour questionner l'api back-the-tsunami
 * @returns {JSX.Element}
 * @constructor
 */
const AddressSearch = ({state}) => {
    const [loading, setLoading] = useState(false);
    const [plugins, setPlugins] = useState([]);
    const [isCheckAll, setIsCheckAll] = useState(true);
    const [isCheck, setIsCheck] = useState([]);
    const {handleSubmit, register, formState : {errors}} = useForm();

    // récupère la liste des plugins disponible pour tsunami
    useState(()=>{
        axios
            .get(`http://localhost:3000/plugins`)
            .then((res) => {
                setPlugins(res.data);
            }).catch(err=>{
                console.log(err);
        })
    })

    /**
     * Envoi le contenu du formulaire à l'API back-the-tsunami afin de lancer le scan
     * @param data contient l'adresse à scanner
     */
    function onSubmit(data){
        setLoading(true);
        const pluginsList = isCheckAll ? "*" : isCheck.map(e=>plugins[e]).join(":");
        //console.log(pluginsList);
        axios
            .get(`http://localhost:3000/tsunami?host=${data.address}&plugins=${pluginsList}`)
            .then((res) => {
                setLoading(false);
                state(res.data);
            }).catch((err, res)=>{
                setLoading(false);
                console.log(err);
                state({error: err.message, info: err.response.data});
            })
    }

    /**
     * Permet de mettre à jour tous les éléments si il doivent tous etre checké ou non
     * @param e
     */
    function handleSelectAll(e){
        setIsCheckAll(!isCheckAll);

        // vide le contenu des élément checké
        if (isCheckAll) {
            setIsCheck([]);
            return
        }

        setIsCheck(plugins.map((e, index) => index.toString()));
    }

    /**
     * Permet de mettre à jour la liste des plugins coché
     * @param e l'élément sélectionné
     */
    function handleClick(e){
        // défini qu'il ne sont pas tous checké
        setIsCheckAll(false);
        const { name, checked } = e.target;

        if (!checked) {
            setIsCheck(isCheck.filter(item => item !== name));
        } else{
            setIsCheck([...isCheck, name]);
        }
    }

    return (
        <div className="Search">
            <form onSubmit={handleSubmit(onSubmit)} className={(loading ? " Disappeared" : "") + " FormSearch"}>
                <input className={"AddressSearch"}
                       type="text"
                       {...register("address", {required : true})}
                />
                {errors.name && <p>Une adresse est necessaire</p>}
                <button type="submit">Démarrer le scan</button>

                <input type="checkbox" name="checkAll" onChange={handleSelectAll} checked={isCheckAll}/>
                <label htmlFor="checkAll">Séléctionner tous les plugins</label>

                <DropdownMenu name="Listes des plugins" options={{width: "90%"}}>

                    <Grid nbColumn="3" size="30vw">
                        {plugins.map((element, index) => {
                            const name = index.toString();
                            return(
                                <Item key={`${name}-key`}>
                                    <input type="checkbox"  onChange={handleClick} name={name}  checked={isCheck.includes(name)}/>
                                    <label htmlFor={name}> {element.split(".jar")[0]}</label>
                                </Item>
                            );
                        })}
                    </Grid>
                </DropdownMenu>

            </form>
            {loading && <Loading/>}
        </div>
    );
};

export default AddressSearch;