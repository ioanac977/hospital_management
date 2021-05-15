import React, { Component } from 'react';
import {Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row, Container} from 'reactstrap';
import { USERS_API_URL } from '../constants';
class UsersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameFilter :'',
            hospitalFilter :'',
            isDropdownOpen : false,
            items: []
        };
    }
    componentDidMount() {
        this.getItems();
    }
    getItems = () => {
        fetch(USERS_API_URL)
            .then(res => res.json())
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }
    onChangeHandler(e){
        this.setState({
            nameFilter: e.target.value,
        })
    }
    onDropDownToogle(e){
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen,
        })
    }
    onDropdownItemSelect (e)
    {
        console.log("click value :",e);
        this.setState({
            hospitalFilter: e,
        })

    }
    onDropdownSelectAll(){
        this.setState({
            hospitalFilter: '',
        })
    }

    render() {

        let items = this.state.items;

        return <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <h3>Users</h3>
                </Col>
            </Row>
            <Row>
                <Col>
            <Table striped>
                <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Name</th>
                    <th>Is Admin</th>
                </tr>
                </thead>
                <tbody>
                {!items || items.length <= 0 ?
                    <tr>
                        <td colSpan="5" align="center"><b>No userss added yet!</b></td>
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
                                {item.password}
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.isAdmin}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
                </Col>
            </Row>
        </Container>;
    }
}
export default UsersList;