import React, { Component } from 'react';
import axios from 'axios'
import base from './rebase.js';
import './App.css'

// window.base

// I need to access the respo's.

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      Name: "",
      logged: "You are not logged in",
    }
  }

  logIn () {
    var authHandler = (error, data) => {
      console.log(error, data)
      this.setState({
        user: data.user,
        logged:"You are logged in"
      })
    }
  base.authWithOAuthPopup('google', authHandler);
  }

  logOut () {
    base.unauth()
    this.setState({
      user:{},
      logged:"You are logged put"
    })
  }

 loginOrLogOutButton () {
    if(this.state.user.uid) {
      return <button className="log" onClick={this.logOut.bind(this)}> log out </button>
    } else {
      return <button className="log" onClick={this.logIn.bind(this)}> log in </button>
    }
  }

  addProjectToFirebase(event) {
    event.preventDefault();
    const project = this.projectName.value;
    const user = this.userName.value;
    console.log(project)
    base.push("/" + user + "/project",
    {data: {name: project}})
    console.log(null)
  }

  addUserToFirebase(event) {
    event.preventDefault();
    const user = this.userName.value;
    console.log(user)
    base.push("/" + user + "/",
    {data: user })
  }

  getInfo () {
    base.fetch(`/users/${this.state.user.displayName}/projects`, {
      context: this,
      asArray: true,
    }).then( response => console.log(response))
  }

  formIfLoggedIn(){
    if (this.state.user.uid){
      return (
        <form >
        <input
        className="something" placeholder="Favorite GitHub Projects"
        ref={ element => this.projectName = element}/>
        <button onClick={this.addProjectToFirebase.bind(this)}> Add to Firebase </button>
        <br />
        <input
        className="something" placeholder="Git-Hub users"
        ref={ element => this.userName = element}/>
          <button onClick={this.addUserToFirebase.bind(this)}> Add to Firebase </button>
        </form >
      )
    }
  }

  searchRepo(data){
    return (
      <form>
        <input placeholder="something" />
      </form>
    )
  }

  searchUsersForm(event) {
    event.preventDefault();
    let gituser = this.userName.value;
    console.log(gituser)
    axios.get(`https://api.github.com/users/` + gituser)
    .then( response => {
      let name = response.data.name;
      let repos = response.data.public_repos;
      console.log(response)
      this.setState({
        Name: name,
        Repos: repos,
      })
      console.log(this.state.Repos)
    })

  }

  loadSearch () {
    if(this.state.user.uid){
      return (
        <form onSubmit={this.searchUsersForm.bind(this)}>
          <input placeholder=" Search User "
          ref={ element => this.userName = element}/>
          <button > Search User </button>
        </form>
      )
    }
  }
displayData () {
  var userId = base.auth().currentUser.uid;
  const user = this.userName.value;
  console.log(user.v)
return base.database().ref("/" + user + "/project").once('value').then(function(snapshot) {
  var username = snapshot.val();
  console.log(username)

});
}

  render() {
    return (
      <div className="App">
      <h1> {this.state.Name} </h1>
      <h3 className="logged"> {this.state.logged} </h3>
        {this.loadSearch()}
        <div className="App-header">
        {this.formIfLoggedIn()}
        </div>
        <p className="App-intro"> {this.loginOrLogOutButton()} </p>
        <button onClick={this.getInfo.bind(this)}> Display Data In FireBase </button>
      </div>
    );
  }
}

export default App;
