import React, { Component, Fragment } from 'react';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home';
import {Link, Route, BrowserRouter as Router , Switch} from "react-router-dom";
import UsersList from "./components/UsersList";

class App extends Component {
  render() {
    return <Fragment>

      <AppHeader />
      {/*<Home />*/}
      <Router>

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
            <UsersList/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>

      </Router>
      <AppFooter />
    </Fragment>;
  }
}
export default App;
