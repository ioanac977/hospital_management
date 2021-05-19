import React from 'react';
import {Redirect, Route} from 'react-router-dom';


export const ProtectedRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => {
        const currentUser = JSON.parse(localStorage.getItem("authorizedUser"));
        console.log("currentUser:", currentUser);
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }

        // authorised so return component
        return <Component/>
    }}/>
);