import React, {useState} from 'react';
import Navigation from "../components/Navigation";
import Weaver from "../components/Weaver";
import AddressSearch from "../components/AddressSearch";
import ResultTsunami from "../components/ResultTsunami";

const Home = () => {
    const [report, setReport] = useState({});

    return (
        <div className="Home">
            <Navigation/>
            <h1>See the Tsunami</h1>
            {
                Object.keys(report).length === 0 ?
                    (<AddressSearch state={setReport}/>) :
                    (<ResultTsunami report={report} state={setReport}/>)
            }

            <Weaver/>
        </div>
    );
};

export default Home;