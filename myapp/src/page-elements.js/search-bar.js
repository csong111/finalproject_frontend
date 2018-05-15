import React, { Component } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import '../App.css';

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            query: ""
        }
    }

    handleSubmit = () => {

    }

  render() {
    return (
      <div className="">
        <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={(e)=>this.setState({query: e.target.value})}/>
            <input type="submit"/>
        </form>
      </div>
    );
  }
}


export default SearchBar;