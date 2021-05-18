import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import PatientsList from './PatientsList';
import { PATIENTS_API_URL } from '../constants';
import Redirect from "react-router-dom/es/Redirect";
class Home extends Component {

    render() {
        let authUserFromStorage=JSON.parse(localStorage.getItem("authorizedUser"));
        if(authUserFromStorage!=null){
           return <div>
               <img src= "https://cdn.dribbble.com/users/112162/screenshots/1130822/lifeline.gif" />
           </div>
        }
        return (<Redirect to={'/login'}/>)
    }
}
export default Home;