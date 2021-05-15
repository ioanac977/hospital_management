import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

import { USERS_API_URL } from '../../constants';

class RegistrationForm extends React.Component {

    state = {
        id: 0,
        username: '',
        password: '',
        name: '',
        isAdmin: false,
    }

    componentDidMount() {
        if (this.props.user) {
            const { id, username, password, name, isAdmin } = this.props.user
            this.setState({ id, username, password, name, isAdmin});
        }
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitNew = e => {
        e.preventDefault();

        fetch(`${USERS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                isAdmin: this.state.isAdmin
            })
        })
            .then(res => res.json())
            .then(user => {
                this.props.addUserToState(user);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }

    submitEdit = e => {
        console.log("props are:",this.props)
        e.preventDefault();
        fetch(`${USERS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                isAdmin: false
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateUserIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }

    render() {
        return <Form onSubmit={this.props.user ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="username">Username:</Label>
                <Input type="text" name="username" onChange={this.onChange} value={this.state.username === '' ? '' : this.state.username} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password:</Label>
                <Input type="text" name="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password} />
            </FormGroup>
            <FormGroup>
                <Label for="name">Name:</Label>
                <Input type="name" name="name" onChange={this.onChange} value={this.state.name === null ? '' : this.state.name} />
            </FormGroup>

            <Button>Send</Button>
        </Form>;
    }
}

export default RegistrationForm;