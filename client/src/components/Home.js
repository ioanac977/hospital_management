import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import PatientsList from './PatientsList';
import { PATIENTS_API_URL } from '../constants';
class Home extends Component {
    state = {
        items: []
    }
    componentDidMount() {
        this.getItems();
    }
    getItems = () => {
        fetch( PATIENTS_API_URL)
            .then(res => res.json())
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }
    render() {
        return <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <h3>Patients</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <PatientsList
                        items={this.state.items}
                    />
                </Col>
            </Row>
        </Container>;
    }
}
export default Home;