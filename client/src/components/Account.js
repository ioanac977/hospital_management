import React, {Component} from 'react';
import {Table} from 'reactstrap';
import {USERS_API_URL} from '../constants';
import RegistrationModal from "./form/RegistrationModal";

class Account extends Component {
    state = {
        item: {},
        id: 0
    };

    componentDidMount() {
        this.getItem();
    }

    getItem = () => {
        console.log("this.props", this.props);
        let id = this.state.id;
        if (this.props.authUser.id !== undefined)
            id = this.props.authUser.id;
        else {
            let authUserFromStorage = JSON.parse(sessionStorage.getItem("authorizedUser"));
            if (authUserFromStorage != null) {
                id = authUserFromStorage.id;
            }
        }

        fetch(`${USERS_API_URL}/${id}`)
            .then(res => res.json())
            .then(res => this.setState({item: res}))
            .catch(err => console.log(err));
    };
    updateState = () => {
        this.getItem();
    };

    render() {
        console.log('account render', this.props);
        const item = this.state.item;

        return <Table striped>
            <thead className="thead-dark">
            <tr>
                <th>Username</th>
                <th>Password</th>
                <th>Name</th>
                <th style={{textAlign: "center"}}>Actions</th>
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
                                updateUserIntoState={this.updateState}
                            />
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