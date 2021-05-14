import React, { Component } from 'react';
import { Table } from 'reactstrap';
class PatientsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameFilter :''
        };
    }
    onChangeHandler(e){
        this.setState({
            nameFilter: e.target.value,
        })
    }

    render() {

        let items = this.props.items
            .filter(d => this.state.nameFilter === '' || (d.name.toLowerCase()).includes((this.state.nameFilter).toLowerCase()))

        return <div>
            <p>
                Type to filter list by name:
                <input id="nameFilter"
                       name="nameFilter"
                       type="text"
                       value={this.state.nameFilter}
                       onChange={this.onChangeHandler.bind(this)}
                />
            </p>
            <Table striped>
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
                    <td colSpan="5" align="center"><b>No patients added yet!</b></td>
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
        </Table>
        </div>;
    }
}
export default PatientsList;