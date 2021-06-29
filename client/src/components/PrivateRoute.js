import React from 'react';
import {Redirect, Route} from 'react-router-dom';


export const PrivateRoute = ({component: Component, roles, ...rest}) => (
    <Route {...rest} render={props => {
        // const currentUser = JSON.parse(sessionStorage.getItem("authorizedUser"));
        // console.log("currentUser:", currentUser);
        if (!rest.authUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
        }

        // check if route is restricted by role
        if (rest.authUser.isAdmin != true) {
            // role not authorised so redirect to home page
            return <Redirect to={{pathname: '/'}}/>
        }

        // authorised so return component
        return <Component/>
    }}/>
);