import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Api} from "../api";


function Join() {

    // @ts-ignore
    const {id} = useParams();

    const isUserActive = localStorage.getItem('auth');
    const history = useHistory();
    if (!isUserActive) {
        history.replace('/');
    }
    const joinWorkspace = () => {
        Api.WorkspacesApi.join({ id: id }).then(() => {
            history.replace('/menu');
        })
    }

    useEffect(() => {
        joinWorkspace();
    }, []);
    return <React.Fragment />

}

    // @ts-ignore


export default Join;


