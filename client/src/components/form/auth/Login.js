import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormText, FormFeedback,
} from 'reactstrap';
import {AUTH_API_URL, PATIENTS_API_URL, USERS_API_URL} from "../../../constants";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'password': '',
            validate: {
                usernameState: '',
            },
        }
        this.handleChange = this.handleChange.bind(this);
    }

    validateEmail(e) {
        const usernameRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if ((e.target.value).length > 2) {
            validate.usernameState = 'has-success'
        } else {
            validate.usernameState = 'has-danger'
        }
        this.setState({ validate })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [ name ]: value,
        });
    }

    submitForm(e) {
        e.preventDefault();
        console.log(`Username: ${ this.state.username }`)

        fetch(AUTH_API_URL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then(res => res.json())
            .then(user => {console.log("Successfully login")

            })
            .catch(err => console.log(err));
    }

    render() {
        const { username, password } = this.state;
        return (
            <Container className="App">
                <h2>Sign In</h2>
                <Form className="form" onSubmit={ (e) => this.submitForm(e) }>
                    <Col>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="username"
                                name="username"
                                id="exampleEmail"
                                placeholder="myusername@username.com"
                                value={ username }
                                valid={ this.state.validate.usernameState === 'has-success' }
                                invalid={ this.state.validate.usernameState === 'has-danger' }
                                onChange={ (e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                } }
                            />
                            <FormFeedback valid>
                                That's a tasty looking username you've got there.
                            </FormFeedback>
                            <FormFeedback>
                                Uh oh! Looks like there is an issue with your username. Please input a correct username.
                            </FormFeedback>
                            <FormText>Your username is most likely your username.</FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={ password }
                                onChange={ (e) => this.handleChange(e) }
                            />
                        </FormGroup>
                    </Col>
                    <Button>Submit</Button>
                </Form>
            </Container>
        );
    }
}

export default Login;