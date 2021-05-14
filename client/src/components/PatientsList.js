import React, { Component } from 'react';
import { Table } from 'reactstrap';
class PatientsList extends Component {
    render() {
        const items = this.props.items;
        return <Table striped>
            <thead className="thead-dark">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Date Of Birth</th>
                <th>Hospital</th>
            </tr>
            </thead>
            <tbody>
            {!items || items.length <= 0 ?
                <tr>
                    <td colSpan="5" align="center"><b>No Users yet</b></td>
                </tr>
                : items.map(item => (
                    <tr key={item.id}>
                        <th scope="row">
                            {item.id}
                        </th>
                        <td>
                            {item.name}
                        </td>
                        <td>
                            {item.dateOfBirth}
                        </td>
                        <td>
                            {item.hospital}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>;
    }
}
export default PatientsList;