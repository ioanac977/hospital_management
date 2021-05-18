import React, { Component } from 'react';
import { Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {PATIENTS_API_URL} from "../constants";

class PatientsList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nameFilter :'',
            hospitalFilter :'',
            isDropdownOpen : false,

        };
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
        console.log("sessionStorage on login:",sessionStorage.getItem('token'));
        let items = this.props.items
            .filter(d => this.state.nameFilter === '' || (d.name.toLowerCase()).includes((this.state.nameFilter).toLowerCase()))
        items = items
            .filter(d => this.state.hospitalFilter === '' || d.hospital.includes(this.state.hospitalFilter))
        let distinctHospitalItems = this.props.items
            .filter((value, index, self) => self
                .map(x => x.hospital)
                .indexOf(value.hospital) === index)

        return <div>
            <p>
                Type to filter list by name:
                <input id="nameFilter"
                       name="nameFilter"
                       type="text"
                       value={this.state.nameFilter}
                       onChange={this.onChangeHandler.bind(this)}
                />
                <Dropdown isOpen={this.state.isDropdownOpen} toggle={this.onDropDownToogle.bind(this)}>
                    <DropdownToggle caret>
                        {this.state.hospitalFilter === '' ? "Hospital" : this.state.hospitalFilter}
                    </DropdownToggle>

                    <DropdownMenu>
                        <DropdownItem onClick={() => this.onDropdownSelectAll()}>All</DropdownItem>
                        <DropdownItem divider></DropdownItem>
                        {!distinctHospitalItems || distinctHospitalItems.length <= 0 ?
                            <div>
                                "No Data!"
                            </div>

                         : distinctHospitalItems.map(item => (
                        <DropdownItem onClick={() => this.onDropdownItemSelect(item.hospital)} >{item.hospital}</DropdownItem>
                            ))}
                    </DropdownMenu>

                </Dropdown>
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