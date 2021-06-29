import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import Account from "./Account";


export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        console.log('rest', rest);

        // const currentUser = JSON.parse(sessionStorage.getItem("authorizedUser"));
        // const currentauthUserUser = this.props.currentUser;
        if (!rest.authUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }

        const allProps = {...props, authUser: rest.authUser};
        // authorised so return component
        return <Component  {...allProps}/>
    }}/>

);