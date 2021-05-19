import React, {Component} from 'react';
import Redirect from "react-router-dom/es/Redirect";
import {LOGOUT_API_URL} from "../../../constants";

class Logout extends Component {
    state = {
        navigate: false
    };

    componentDidMount() {
        this.logout();
    }


    logout = () => {
        sessionStorage.removeItem('token');
        console.log("sessionStorage before logout:", sessionStorage.getItem('authorizedUser'));
        sessionStorage.removeItem('authorizedUser');
        console.log("sessionStorage on logout:", sessionStorage.getItem('authorizedUser'));
        this.setState({navigate: true});
        this.props.handleLogout({});

        fetch(LOGOUT_API_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',

        })
            .then(res => res.json())
            .then(user => {
                console.log("Successfully logout");


            })

            .catch(err => console.log(err));

    };

    render() {
        const {navigate} = this.state;
        if (navigate) {
            return <Redirect to="/" push={true}/>;
        }
        return <div>Succesfully logged out</div>
    }
}

export default Logout;