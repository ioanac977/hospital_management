import React, {Component} from 'react';
import {Button, Table} from 'reactstrap';
import {USERS_API_URL} from '../constants';
import RegistrationModal from "./form/RegistrationModal";

class UsersList extends Component {

    deleteItem = id => {
        let confirmDeletion = window.confirm('Do you really wish to delete it?');
        if (confirmDeletion) {
            fetch(`${USERS_API_URL}/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    this.props.deleteItemFromState(id);
                })
                .catch(err => console.log(err));
        }
    };

    render() {

        const items = this.props.items;

        return <Table striped>
            <thead className="thead-dark">
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Name</th>
                <th>Is Admin</th>
                <th style={{textAlign: "center"}}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {!items || items.length <= 0 ?
                <tr>
                    <td colSpan="5" align="center"><b>No users added yet!</b></td>
                </tr>
                : items.map(item => (
                    <tr key={item.id}>
                        <th scope="row">
                            {item.id}
                        </th>
                        <td>
                            {item.username}
                        </td>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.isAdmin.toString()}
                        </td>
                        <td align="center">
                            <div>
                                <RegistrationModal
                                    isNew={false}
                                    user={item}
                                    updateUserIntoState={this.props.updateState}
                                    users={this.props.items}
                                />
                                &nbsp;&nbsp;&nbsp;
                                <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    }
}

export default UsersList;