import React, { Component, Fragment } from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home';
import {Link, Route, BrowserRouter as Router , Switch} from "react-router-dom";
import Users from "./components/Users";
import Account from "./components/Account";

class App extends Component {
  render() {
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
          <Route path="/users">
            <Users/>
          </Route>
            <Route path="/account">
                <Account/>
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
