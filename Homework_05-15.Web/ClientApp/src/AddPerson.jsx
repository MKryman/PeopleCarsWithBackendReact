import React from "react";
import axios from 'axios';
import {produce} from 'immer';
import PeopleTable from "./PeopleTable";

class AddPerson extends React.Component {
    state = {
        currentlyAddingPerson: {
            firstName: '',
            lastName: '',
            age: '',
            thisPersonsCars: []
        },
    }

    textChange = e => {
        const changeState = produce(this.state, drafState => {
            drafState.currentlyAddingPerson[e.target.name] = e.target.value;
        });
        this.setState(changeState);
    }

    addPerson = async () => {
        await axios.post('/api/people/addperson', this.state.currentlyAddingPerson);
        this.props.history.push('/');
    }

    render() {
        const {firstName, lastName, age} = this.state.currentlyAddingPerson;
        return(
            <>
                <div className="row">
                    <div className="col-md-4 offset-md-4 card bg-light p-4" style={{marginTop: 160}}>
                        <input type="text" value={firstName} name="firstName" 
                        onChange={this.textChange} className="form-control" 
                        placeholder="First Name" />
                        <br />
                        <input type="text" value={lastName} name="lastName" 
                        onChange={this.textChange} className="form-control" 
                        placeholder="Last Name" />
                        <br />
                        <input type="text" value={age} name="age" 
                        onChange={this.textChange} className="form-control" 
                        placeholder="Age" />
                        <br />
                        <button onClick={this.addPerson} className="btn btn-primary btn-block">Submit</button>
                    </div>
                </div>
            </>
        )
    }
}

export default AddPerson;