import React, { Component } from 'react';
import Link from 'react-router-dom'
import axios from 'axios'
import base from './rebase';





class MoreDetails extends Component {

  constructor () {
    super();
    this.state = {
      extraData:{},
      ownerData:{},
      comment: []
    }
  }

  homePage () {
    if (this.data.homepage){
      return <p> "this is the home page " {this.data.homepage} </p>
    } else {
      return
    }
  }


componentWillReceiveProps (nextProps) {

 axios.get(`https://api.github.com/repositories/${nextProps.match.params.id}`)
 .then( response =>  this.setState({ extraData: response.data,
 ownerData: response.data.owner }))
 this.linkstate()
}

  componentDidMount () {
    axios.get(`https://api.github.com/repositories/${this.props.match.params.id}`)
    .then( response =>  this.setState({ extraData: response.data,
    ownerData: response.data.owner }))
  }

  addComment (e) {
    e.preventDefault()
    const comments = { message: this.text.value}
    this.setState({
      comment: this.state.comment.concat(comments)
    });
    this.text.value= ''
    console.log(this.state.comment)
  }
  linkstate () {
    this.offSwitchForComments = base.syncState(`comment/projects/${this.state.extraData.id}/comment`, {
      context: this,
      asArray: true,
      state: 'comment'
    });
  }

  componentWillUnmount () {
    base.removeBinding(this.offSwitchForComments)
  }

  descriptions () {
    console.log(this.state.comment)
    return this.state.comment.map((obj,index) => {
      return (
        <li key={index}>
          <p> {obj.message} </p>
          <p> Something? </p>
        </li>
      )
    })
  }


  render (){
    let data = this.state.extraData;
    let ownerData = this.state.ownerData;



    return (
      <div>

          <header>
          <h1> {data.name} </h1>
          <h1> <span className="ownerName"> Created by </span> {ownerData.login} </h1>
          </header>
          <div className="flex">
            <div className="boxOne">
              <img src={ownerData.avatar_url} />
            </div>
            <div className="boxTwo">
              < a className="info" href={ownerData.html_url} />
              <p className="info"> Star Count {data.stargazers_count} </p>
              <p className="info"> This was created on {data.created_at} </p>
              <p className="info"> This was last updated on {data.updated_at} </p>
              {this.homePage.bind(this)}
              <p className="info">languages: {data.language} </p>
              <p className="info"> Open issues Count: {data.open_issues_count} </p>

          </div>
          <div>
            <h1> Comments </h1>
            <ul className="theComments"> {this.state.comment.map(( obj, index) =>
              <p> {obj.message} </p>
            )}   </ul>
          </div>
         </div>
         <h3> Add Comment </h3>
         <form onSubmit={this.addComment.bind(this)}>
         <input className="comment" type="text" ref={(input) => {this.text = input}}/>
         <button> Add Comment </button>
         </form>
      </div>
    )
  }


}

export default MoreDetails;
