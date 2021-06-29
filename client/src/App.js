import React, { Component, Fragment } from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home';
import {Link, Route, BrowserRouter as Router , Switch} from "react-router-dom";
import Users from "./components/Users";
import Account from "./components/Account";
import Login from "./components/form/auth/Login";
import Logout from "./components/form/auth/Logout";
import {PrivateRoute} from "./components/PrivateRoute";
import {Role} from "./_helpers/Role";
import Patients from "./components/Patients";
import "./App.css";
import {ProtectedRoute} from "./components/ProtectedRoute";
import {AUTH_USER_INFO, EDIT_USER_INFO} from "./constants";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined
        }
    }
    componentDidMount() {
        this.getAuthUser();
    }

    getAuthUser = () => {
        fetch(`${AUTH_USER_INFO}`)
            .then(res => res.json())
            .then(res => this.setGlobalCredentials(res))
            .catch(err => {
                this.setGlobalCredentials(null)
            });
    }

    setGlobalCredentials = (authUser) => {
            this.setState({
                currentUser: authUser
            });
    }


  render() {

    return (this.state.currentUser !== undefined && <Router>
        <Fragment>
          <AppHeader authUser={this.state.currentUser}/>
            <Switch>
                {/*Private routes are for admin user and protected for logged users*/}
                <PrivateRoute path="/users" authUser={this.state.currentUser} roles={[Role.Admin]} component={Users}/>
                <ProtectedRoute path="/account"  authUser={this.state.currentUser} component={Account} />
                {/*Using a callback function to set global credentials if login is successfully and clear them if logout
                Also using sessionStorage for individual cases*/}
                <Route path="/login" >
                    <Login handleLogin={this.setGlobalCredentials}/>
                </Route>
                <Route path="/logout">
                    <Logout handleLogout={this.setGlobalCredentials}/>
                </Route>
                <ProtectedRoute path="/patients" authUser={this.state.currentUser} component= {Patients}/>
                <ProtectedRoute path="/" authUser={this.state.currentUser} component={Home}/>

            </Switch>
          <AppFooter />
        </Fragment>;

      </Router>);

  }
}
export default App;
