import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import Weaver from "../components/Weaver";
import Grid from "../components/table/Grid";
import Item from "../components/table/Item";

const Result = () => {

    return (
        <div style={{width: "200px"}}>
            <Navigation/>
            <Grid nbColumn="3">
                <Item>
                    hello
                </Item>
                <Item>
                    peaopleezfzefze fzefzefzefzefzefzefzef
                </Item>
                <Item line="2" column="2">
                    joyaux
                </Item>
                <Item>
                    actomoule
                </Item>
                <Item>
                    lolo
                </Item>
                <Item>
                    lili
                </Item>
            </Grid>
            <Weaver></Weaver>
        </div>
    );
};

export default Result;