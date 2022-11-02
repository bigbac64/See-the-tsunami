import React, {useState} from 'react';
import axios from "axios";
import {useForm} from "react-hook-form";
import Loading from "./Loading";
import ResultTsunami from "./ResultTsunami";

const AddressSearch = () => {
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState({});
    const {handleSubmit, register, formState : {errors}} = useForm();

    function onSubmit(data){
        setLoading(true);
        axios
            .get(`http://localhost:3000/tsunami?host=${data.address}&plugins=nmap_port_scanner-0.0.1-SNAPSHOT`)
            .then((res) => {
                setLoading(false);
                setReport(res.data);
            }).catch(err=>{
                setLoading(false);
                console.log(err);
                setReport({scanStatus: "FAILED",error: err.message, info: "La connexion avec l'API a échoué"});
            })
    }

    return (
        <div className="Search">
            {Object.keys(report).length === 0 ? (
            <form onSubmit={handleSubmit(onSubmit)} className={loading ? " Disappeared" : ""}>
                <input className={"AddressSearch"}
                       type="text"
                       {...register("address", {required : true})}
                />
                {errors.name && <p>Une adresse est necessaire</p>}
                <button type="submit">Démarrer le scan</button>
            </form>
            ) :
            <ResultTsunami report={report}/>
            }
            {loading && <Loading/>}
        </div>
    );
};

export default AddressSearch;