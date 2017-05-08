import React, { Component } from 'react';
import axios from 'axios'
import base from './rebase.js';
import './App.css'


class Search extends Component{
  something () {

    axios.get(`https://api.github.com/repositories/{this.match.params.id}`)
    .then( response =>  this.setState({ extraData: response.data,
    ownerData: response.data.owner }))
  }
}

export default Search
