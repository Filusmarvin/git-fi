import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import MoreDetails from './MoreDetails'




class MiniProject extends Component {
  render () {

    return (
      <div>
        <h1> My projects </h1>
        {this.props.project.map( (obj , index) => {
        return (
          <li className="fire-list" key={index}>
            <p className="project-name"> <strong> Name:</strong> {obj.name} </p>
            <p> Key: {obj.key} </p>
            <p> Id: {obj.id} </p>
            <button onClick={this.props.deleteProject.bind(this)}> Delete from Firebase </button>
            <br /><br />
            <Link to={`/MoreDetails/${obj.id}`} > View More Details </Link>
          </li>
        )
        })
        }
      </div>
    )
  }
}

export default MiniProject;
