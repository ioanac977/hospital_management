import React, { Component } from 'react'; // 1
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
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
    render() { // 7
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">
                <img src="https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png" width="50" className="d-inline-block align-top" alt="" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/">Patients</NavLink>

                    </NavItem>
                    {/*<UncontrolledDropdown nav inNavbar>*/}
                    {/*    <DropdownToggle nav caret>*/}
                    {/*        World*/}
                    {/*    </DropdownToggle>*/}
                    {/*    <DropdownMenu right>*/}
                    {/*        <DropdownItem href="/">For U</DropdownItem>*/}
                    {/*        <DropdownItem>For Us</DropdownItem>*/}
                    {/*    </DropdownMenu>*/}
                    {/*</UncontrolledDropdown>*/}
                    <NavItem>
                        <Link to="/users" >Users</Link>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}
export default AppHeader; // 8