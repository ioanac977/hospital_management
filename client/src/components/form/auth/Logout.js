import React, {Component} from 'react';
import { Button } from 'reactstrap';
import Redirect from "react-router-dom/es/Redirect";
import {AUTH_API_URL, LOGOUT_API_URL} from "../../../constants";
class Logout extends Component {
    state = {
        navigate:false
    };
    componentDidMount() {
        this.logout();
    }


    logout = () => {
        sessionStorage.removeItem('token');
        console.log("localstorage before logout:",localStorage.getItem('authorizedUser'));
        localStorage.removeItem('authorizedUser');
        console.log("localstorage on logout:",localStorage.getItem('authorizedUser'));
        this.setState({navigate:true});
        this.props.handleLogout({});

        fetch(LOGOUT_API_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',

        })
            .then(res => res.json())
            .then(user => {console.log("Successfully logout");


            })

            .catch(err => console.log(err));

    };

    render(){
    const {navigate} = this.state;
    if (navigate) {
        return <Redirect to="/" push={true}/>;
    }
    return <div>Succesfully logged out</div>
    }
}

export default Logout;