import React, {Fragment} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';

import {CHECK_USERNAME_API_URL, EDIT_USER_INFO, USERS_API_URL} from '../../constants';

class AddUserForm extends React.Component {

    state = {
        id: 0,
        username: '',
        password: '',
        name: '',
        isAdmin: false,
        enableButton: true,
        validate: {
            usernameState: '',
            passwordState:'',
        },
        isPasswordEditing: false,

    };

    componentDidMount() {
        this.handleCheckbox.bind(this);
        if (this.props.user) {
            const {id, username, password, name, isAdmin} = this.props.user;
            this.setState({id, username, password, name, isAdmin});
        }
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value})
    };

    handleCheckbox = event => {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log("value is :", value);
        console.log("name:", name);
        this.setState({
            [name]: value
        });

    };

    makeCheckRequest(currentUserValue) {

        fetch(CHECK_USERNAME_API_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: currentUserValue,
            })
        })
            .then(res => res.text())
            .then(res => {
                if (res === "false") {
                    this.setState({validate: {...this.state.validate, usernameState: 'has-success'}});
                    this.setState({enableButton: true})
                } else {
                    this.setState({validate: {...this.state.validate, usernameState: 'has-danger'}});
                    this.setState({enableButton: false})
                }

            })
            .catch(err => console.log(err));

    }

    checkPassword(e){
        const {validate} = this.state;
        if ((e.target.value).length > 2) {
            validate.passwordState = 'has-success'
        } else {
            validate.passwordState = 'has-danger'
        }
        this.setState({validate})

    }
    checkIfUsernameExist(e) {
        //We want to reduce the numbers of request checks to server
        //That's why we implement two methods of verify if username on modify/create already exist on db
        const {validate} = this.state;
        const userList = this.props.users;

        let currentUserValue = e.target.value;

        //if logged user is NOT admin then we need to make requests to check if new username already exist in users table
        if (userList === null) {
            // if(currentUserValue.localeCompare(JSON.parse(sessionStorage.getItem("authorizedUser")).username)!== 0)
                 this.makeCheckRequest(currentUserValue);

        }//if logged user is admin then he has access to usersList -> we are making a check based on data that is already available
        else {
            validate.usernameState = 'has-danger';
            let buttonFlag = false;
            if (currentUserValue.length > 2) {
                const existingUser = userList.find(user => user.username === currentUserValue);
                if (!existingUser) {
                    validate.usernameState = 'has-success';
                    buttonFlag = true;
                }
            }
            this.setState({enableButton: buttonFlag})
        }

        this.setState({validate})
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
    };

    render() {

        return <Form onSubmit={this.submitNew}>
            <Fragment>
                <FormGroup>
                    <Label for="username">Username:</Label>
                    <Input type="text" name="username" onChange={(e) => {
                        this.onChange(e);
                        this.checkIfUsernameExist(e)
                    }}
                           value={this.state.username === null ? '' : this.state.username}
                           valid={this.state.validate.usernameState === 'has-success'}
                           invalid={this.state.validate.usernameState === 'has-danger'}/>
                    <FormFeedback valid>
                        Great! Username is valid
                    </FormFeedback>
                    <FormFeedback>
                        Username is less then 3 characters or it already exist
                        Change to a valid one!
                    </FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Label for="name">Name:</Label>
                    <Input type="text" name="name" onChange={this.onChange}
                           value={this.state.name === null ? '' : this.state.name}/>
                </FormGroup>

                <FormGroup>
                    <Label for="name">IsAdmin:</Label>
                    <Input type="checkbox" name="isAdmin" onChange={this.handleCheckbox}
                           checked={this.state.isAdmin}/>
                </FormGroup>

            </Fragment>

            <FormGroup>
                <Label for="password">New Password:</Label>
                <Input type="text" name="password" onChange={(e) => {
                    this.onChange(e);
                    this.checkPassword(e)
                }}
                        valid={this.state.validate.passwordState === 'has-success'}
                        invalid={this.state.validate.passwordState === 'has-danger'}/>
                <FormFeedback valid>
                    Great! Password is valid
                </FormFeedback>
                <FormFeedback>
                    Password is less then 3 characters.
                    Add some more characters!
                </FormFeedback>
            </FormGroup>
            <button disabled={!this.state.enableButton}>Save</button>


        </Form>;

    }

}

export default AddUserForm;