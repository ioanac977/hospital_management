import React, {Component} from 'react';
import {Button, Col, Container, Form, FormFeedback, FormGroup, Input, Label,} from 'reactstrap';
import {AUTH_API_URL} from "../../../constants";
import Redirect from "react-router-dom/es/Redirect";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'username': '',
            'password': '',
            validate: {
                usernameState: '',
                passwordState: '',
            },

            redirect: false,
            loginError: false,
            authUser: {}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    validateInput(e, inputState) {

        const {validate} = this.state;
        if ((e.target.value).length > 2) {
            validate[inputState] = 'has-success'
        } else {
            validate[inputState] = 'has-danger'
        }
        this.setState({validate})
    }


    handleChange = async (event) => {
        const {target} = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const {name} = target;
        await this.setState({
            [name]: value,
        });
    };

    submitForm(e) {
        e.preventDefault();

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
            .then(authUser => {
                    if (authUser.username) {
                        localStorage.setItem("authorizedUser", JSON.stringify(authUser));
                        this.setState({redirect: true});
                    } else {
                        this.setState({loginError: true});
                    }

                    this.props.handleLogin(authUser);

                }
            )

            .catch(err => console.log(err));

    }

    render() {
        const {username, password} = this.state;
        if (!this.state.redirect) {
            return (
                <Container className="App">
                    <h2>Sign In</h2>
                    <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                        <Col>
                            <FormGroup>
                                <Label>Username</Label>
                                <Input
                                    type="username"
                                    name="username"
                                    id="exampleUSername"
                                    placeholder="myusername"
                                    value={username}
                                    valid={this.state.validate.usernameState === 'has-success'}
                                    invalid={this.state.validate.usernameState === 'has-danger'}
                                    onChange={(e) => {
                                        this.validateInput(e, 'usernameState');
                                        this.handleChange(e)
                                    }}
                                />
                                <FormFeedback valid>
                                    Great! Username is valid
                                </FormFeedback>
                                <FormFeedback>
                                    Uh oh! Looks like there is an issue with your username.
                                    Make sure that username has more than 3 characters!
                                </FormFeedback>
                                {/*<FormText>Your username is most likely your username.</FormText>*/}
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
                                    value={password}
                                    valid={this.state.validate.passwordState === 'has-success'}
                                    invalid={this.state.validate.passwordState === 'has-danger'}
                                    onChange={(e) => {
                                        this.validateInput(e, 'passwordState');
                                        this.handleChange(e)
                                    }}
                                />
                                <FormFeedback valid>
                                    Great! Password is valid
                                </FormFeedback>
                                <FormFeedback>
                                    Uh oh! Looks like there is an issue with your password.
                                    Make sure that password has more than 3 characters!
                                </FormFeedback>
                            </FormGroup>
                        </Col>
                        <Button>Submit</Button>
                        {
                            this.state.loginError && <p>
                                Login failed
                            </p>
                        }
                    </Form>
                </Container>
            );
        } else {
            return (<Redirect to={'/'}/>)
        }
    }
}

export default Login;