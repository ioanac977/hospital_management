import React, {Component, Fragment} from 'react'; // 1
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem} from 'reactstrap';
import {Link} from "react-router-dom"; // 2
class AppHeader extends Component { // 3
    state = { // 4
        isOpen: false
    };
    toggle = this.toggle.bind(this); // 5
    toggle() { // 6
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        let authUser = JSON.parse(sessionStorage.getItem("authorizedUser"));
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                <img src="https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png"
                     width="50" className="d-inline-block align-top" alt=""/>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {authUser != null &&
                    <Fragment>
                        <NavItem>
                            <Link className="Link" to="/patients">Patients</Link>
                        </NavItem>
                        {authUser.isAdmin &&

                        <NavItem>
                            <Link className="Link" to="/users">Users</Link>
                        </NavItem>
                        }
                        <NavItem>
                            <Link className="Link" to="/account">Account</Link>
                        </NavItem>

                        <NavItem>
                            <Link className="Link" to="/logout">Logout</Link>
                        </NavItem>
                    </Fragment>
                    }

                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default AppHeader; // 8