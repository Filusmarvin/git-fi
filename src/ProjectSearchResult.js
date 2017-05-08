import React, { Component } from 'react';
import Link from 'react-router-dom'
class ProjectSearchResult extends Component {

  handleClick (project) {
    if(this.props.alreadyInFirebase){
      this.props.deleteProject(project)
    }else {
      this.props.addProject(project)
    }
  }

  addOrRemoveButton (project) {
    if (this.props.alreadyInFirebase) {
      return <button onClick={this.handleClick.bind(this,project)}> Delete from Firebase </button>
    } else {
      return <button onClick={this.handleClick.bind(this, project)}>Add to Firebase</button>
    }
  }
  render () {
    const project = this.props.project;
    return (
      <li className="list">
        <h2> {project.name} </h2>
        <p>Project description: {project.description}</p>
        <p> Number of Stars: {project.stargazers_count} </p>
        <a href={project.html_url} target="_blank"> Click here to visit <strong>{project.name} in GitHub </strong></a>
        <br /> {this.addOrRemoveButton(project)}

      </li>
    )
  }
}

export default ProjectSearchResult;
