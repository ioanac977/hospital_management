import React, { Component } from 'react';
import {Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row, Container, Button} from 'reactstrap';
import { USERS_API_URL } from '../constants';
import RegistrationModal from "./form/RegistrationModal";
class Account extends Component {
    state = {
        item: {},
        id : 1
    }
    componentDidMount() {
        this.getItem();
    }

    getItem = () => {
        fetch(`${USERS_API_URL}/${this.state.id}`)
            .then(res => res.json())
            .then(res => this.setState({ item: res }))
            .catch(err => console.log(err));
    }
    updateState = () => {
        this.getItem();
    }
    render() {

        const item = this.state.item

        return <Table striped>
            <thead className="thead-dark">
            <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {!item || item.length <= 0 ?
                <tr>
                    <td colSpan="5" align="center"><b>No data available!</b></td>
                </tr>
                :
                    <tr key={item.id}>
                        <td>
                            {item.username}
                        </td>
                        <td>
                            {item.password}
                        </td>
                        <td>
                            {item.name}
                        </td>

                        <td align="center">
                            <div>
                                <RegistrationModal
                                    isNew={false}
                                    user={item}
                                    updateUserIntoState={this.updateState} />
                                &nbsp;&nbsp;&nbsp;
                            </div>
                        </td>
                    </tr>
                }
            </tbody>
        </Table>
    }
}
export default Account;