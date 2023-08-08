import React from "react";
import axios from 'axios';
import PeopleTable from "./PeopleTable";
import CarRow from "./CarRow";


class ViewCars extends React.Component {
    state = {
        cars: [],
        personId: ''
    }

    componentDidMount = async () => {
        const { id } = this.props.match.params;
        const { data } = await axios.get(`/api/people/viewcarsforperson?id=${id}`);
        this.setState({ cars: data, personId: id })
    }

    onDelete = async () => {
        console.log(this.state.personId)
        await axios.post(`/api/people/deletecars?id=${this.state.personId}`);
        this.props.history.push('/');
    }

    generateCarsTable = () => {
        return (
        <table className="table table-hover mt-4">
            <thead>
                <tr>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                </tr>
            </thead>
            <tbody>
                {this.state.cars.map(c => <CarRow car={c} />)}
            </tbody>
        </table>
        )
    }

    render() {
        return(
        <div className="container-fluid">
            {this.generateCarsTable()}
            <div className="d-grid gap-2 d-md-block">
                <span>Delete Cars?</span> <button className="btn btn-danger" onClick={this.onDelete}>Delete</button>
            </div>
        </div>
        )
    }
}

export default ViewCars;