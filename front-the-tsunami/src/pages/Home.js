import React, {useState} from 'react';
import Navigation from "../components/Navigation";
import Weaver from "../components/Weaver";
import Loading from "../components/Loading";
import AddressSearch from "../components/AddressSearch";

const Home = () => {

    return (
        <div className="Home">
            <Navigation/>
            <h1>See the Tsunami</h1>
            <AddressSearch/>
            <Weaver/>
        </div>
    );
};

export default Home;