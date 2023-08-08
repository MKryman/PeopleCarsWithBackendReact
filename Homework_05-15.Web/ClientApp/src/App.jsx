import React from 'react';
import {Route, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layout';
import PeopleTable from './PeopleTable';
import AddPerson from './AddPerson';
import ViewCars from './ViewCars';
import AddCar from './AddCar';

class App extends React.Component {

    render() {
        return (
           <Layout>
                <Route exact path='/' component={PeopleTable} />
                <Route exact path='/addperson' component={AddPerson} />
                <Route exact path='/addCar/:id' component={AddCar} />
                <Route exact path='/viewcars/:id' component={ViewCars} />
           </Layout>
        );
    }
};

export default App;