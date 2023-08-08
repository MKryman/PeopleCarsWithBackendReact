import React from "react";
import PersonRow from "./PersonRow";
import PeopleTable from "./PeopleTable";
import {produce} from "immer";
import axios from "axios";

class AddCar extends React.Component{
    state = {
        currentlyAddingCar: {
            make: '',
            model: '',
            year: '',
            personId: ''
        },
        person: {
            firstName: '',
            lastName: '',
            age: '',
            id: '',
            thisPersonsCars: []
        }
    }

    componentDidMount = async() => {
        const {id} = this.props.match.params;
        const {data} = await axios.get(`/api/people/getpersonbyid?id=${id}`);
        this.setState({person: data})
    }

    textChange = e => {
        const changeState = produce(this.state, drafState => {
            drafState.currentlyAddingCar[e.target.name] = e.target.value;
            const personId = drafState.person.id;
            drafState.currentlyAddingCar = {...drafState.currentlyAddingCar, personId}
        })
        this.setState(changeState);
    }

    addCar = async () => {
         await axios.post('/api/people/addcar', this.state.currentlyAddingCar);
         this.props.history.push('/');
    }
    
    render() {
        const{make, model, year} = this.state.currentlyAddingCar;
        const {firstName, lastName} = this.state.person;
        return (
            <>
            <div className="row">
                <div className="col-md-6 offset-md-3 card w-50 bg-light p-4" style={{marginTop: 160}}>
                    <h5 className="card-title">Add a car for {firstName} {lastName}</h5>
                    <input type="text" className="form-control" name="make" value={make} 
                    onChange={this.textChange} placeholder="Make" />
                    <br />
                    <input type="text" className="form-control" name="model" value={model}
                    onChange={this.textChange} placeholder="Model"/>
                    <br />
                    <input type="text" className="form-control" name="year" value={year}
                    onChange={this.textChange} placeholder="Year" />
                    <br />
                    <button className="btn btn-primary btn-block" onClick={this.addCar}>Submit</button>
                </div>
            </div>
            </>
        )
    }

}
export default AddCar;