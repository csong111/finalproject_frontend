import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import ItemDetail from "./ItemDetail.js";
import './App.css';

class ArtistSignUpComplete extends Component{
    constructor() {
        super();
    }
    render() {
        return (
          <div className="ArtistComp">
            <h1>ARTIST SIGNUP COMPLETE</h1>
          </div>
        );
      }
}

export default ArtistSignUpComplete;