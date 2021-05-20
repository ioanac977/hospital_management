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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }
    setGlobalCredentials = (authUser) => {
            this.setState({
                currentUser: authUser
            });
    }


  render() {

    return <Router>
        <Fragment>
          <AppHeader />
            <Switch>
                {/*Private routes are for admin user and protected for logged users*/}
                <PrivateRoute path="/users" roles={[Role.Admin]} component={Users}/>
                <ProtectedRoute path="/account" component={() => <Account authUser={this.state.currentUser}/>} />
                {/*Using a callback function to set global credentials if login is successfully and clear them if logout
                Also using sessionStorage for individual cases*/}
                <Route path="/login" >
                    <Login handleLogin={this.setGlobalCredentials}/>
                </Route>
                <Route path="/logout">
                    <Logout handleLogout={this.setGlobalCredentials}/>
                </Route>
                <ProtectedRoute path="/patients" component={Patients}/>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
          <AppFooter />
        </Fragment>;
      </Router>

  }
}
export default App;
