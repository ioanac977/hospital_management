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

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: {}
        }
    }
    setGlobalCredentials = (authUser) => {
        console.log("authUser",authUser)
            this.setState({
                currentUser: authUser
            });
    }


  render() {
        console.log('APP.js render', this.state);
    return <Router>
        <Fragment>

          <AppHeader />

        {/*<ul>*/}
        {/*  <li>*/}
        {/*    <Link to="/">Home</Link>*/}
        {/*  </li>*/}
        {/*  <li>*/}
        {/*    <Link to="/users">Users</Link>*/}
        {/*  </li>*/}
        {/*</ul>*/}

        <Switch>
          {/*<Route path="/users">*/}
          {/*  <Users/>*/}
          {/*</Route>*/}
            <PrivateRoute path="/users" roles={[Role.Admin]} component={Users} />
            <Route path="/account" component={() => <Account authUser={this.state.currentUser}/>} />
            <Route path="/login" >
            <Login handleLogin={this.setGlobalCredentials}/>
            </Route>
            <Route path="/logout">
                <Logout handleLogout={this.setGlobalCredentials}/>
            </Route>
            <Route path="/patients">
                <Patients/>
            </Route>
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
