import React from "react";
import { Link } from 'react-router-dom';
import AddPerson from "./AddPerson";
import ViewCars from "./ViewCars";
import AddCar from "./AddCar";
import PersonRow from "./PersonRow";
import axios from 'axios';
import { produce } from 'immer';
import { render } from "react-dom";

class PeopleTable extends React.Component {
    state = {
        people: [],
        cars: []
    }


    componentDidMount = async () => {
        this.refreshTable();
    }

    refreshTable = async () => {
        const response = await axios.get('/api/people/getallpeople');
        this.setState({ people: response.data })
    }

    generateTable = () => {
        return <>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Car Count</th>
                        <th>Add Car</th>
                        <th>Delete Cars</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.people.map(p => <PersonRow key={p.Id}
                        person={p} thisPersonsCars={p.thisPersonsCars} />)}
                </tbody>
            </table>
        </>
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="d-grid gap-2">
                    <Link to='/addperson/'>
                        <button className="btn btn-lg btn-primary">Add Person</button>
                    </Link>
                </div>
                {this.generateTable()}
            </div>
        )
    }
}
export default PeopleTable;
