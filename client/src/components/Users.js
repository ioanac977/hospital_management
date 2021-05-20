import React, {Component} from 'react';
import {Col, Container, Row} from 'reactstrap';
import {USERS_API_URL} from '../constants';
import RegistrationModal from "./form/RegistrationModal";
import UsersList from "./UsersList";

class Users extends Component {
    state = {
        items: []
    };

    componentDidMount() {
        this.getItens();
    }

    getItens = () => {
        fetch(USERS_API_URL)
            .then(res => res.json())
            .then(res => this.setState({items: res}))
            .catch(err => console.log(err));
    };
    addUserToState = user => {
        this.setState(previous => ({
            items: [...previous.items, user]
        }));
    };
    //Update users list after adding a new one
    updateState = (id) => {
        this.getItens();
    };
    deleteItemFromState = id => {
        const updated = this.state.items.filter(item => item.id !== id);
        this.setState({items: updated})
    };

    render() {

        return <Container style={{paddingTop: "100px"}}>
            <Row>
                <Col>
                    <h3>Users</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <UsersList
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <RegistrationModal isNew={true} addUserToState={this.addUserToState} users={this.state.items}/>
                </Col>
            </Row>
        </Container>;
    }
}

export default Users;