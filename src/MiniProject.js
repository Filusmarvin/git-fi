import React, { Component } from 'react';
import Link from 'react-router-dom'
import axios from 'axios'
import MoreDetails from './MoreDetails'




class MiniProject extends Component {
  render () {

    return (
      <div>
        <h1> My projects </h1>
        {this.props.project.map( (obj , index) => {
        return (
          <li key={index}>
            <p> Name: {obj.name} </p>
            <p> Key: {obj.key} </p>
            <p> Id: {obj.id} </p>
          </li>
        )
        })
        }
      </div>
    )
  }
}

export default MiniProject;
