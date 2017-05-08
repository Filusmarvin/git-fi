import React, { Component } from 'react';
import Link from 'react-router-dom'
import axios from 'axios'




class MoreDetails extends Component {

  homePage () {
    if (this.data.homepage){
      return <p> "this is the home page " {this.data.homepage} </p>
    } else {
      return
    }
  }

  render (){
    let data = this.props.data;
    let ownerData = this.props.ownerData;



    return (
      <div>
        <h1> {data.name} </h1>
        <p> Star Count {data.stargazers_count} </p>
        <h1> {ownerData.login} </h1>
        <h1> Hello? </h1>
        <img src={ownerData.avatar_url} />
        < a href={ownerData.html_url} />
        <p> This was created on {data.created__at} </p>
        <p> This was last updated on {data.updated_at} </p>
        {this.homePage.bind(this)}
        <p>languages: {data.language} </p>
        <p> Open issues Count: {data.open_issues_count} </p>

      </div>
    )
  }


}

export default MoreDetails;
