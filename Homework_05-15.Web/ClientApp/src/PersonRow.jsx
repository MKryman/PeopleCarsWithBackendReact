import React from "react";
import {Link} from 'react-router-dom';
import PeopleTable from "./PeopleTable";

export default function PersonRow({ person }) {
    return <>
        <tr>
            <td>{person.firstName}</td>
            <td>{person.lastName}</td>
            <td>{person.age}</td>
            <td>{person.thisPersonsCars.length}</td>
            <td> 
                <Link to={`/addcar/${person.id}`}>
                    <button className="btn btn-success">Add Car</button>
                </Link>
                </td>
            <td>
                <Link to={`/viewcars/${person.id}`}>
                    <button className="btn btn-dark">View Cars</button>
                </Link>
            </td>
        </tr>
    </>
}