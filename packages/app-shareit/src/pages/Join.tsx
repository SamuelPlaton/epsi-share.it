import React, {useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {Api} from "../api";


function Join() {

    /*function Topic() {
        let {id} = useParams();
        return <h3>Requested topic ID: {id}</h3>;
    }*/

    //const id = 5;//react router.getparameter('id');

    const isUserActive = localStorage.getItem('auth');
    const history = useHistory();
    if (!isUserActive) {
        history.replace('/');
    }
    /*Api.WorkspacesApi.join('').then(() => {
        history.replace('/menu')}
    )*/
    return <React.Fragment />

}

    // @ts-ignore


export default Join;


