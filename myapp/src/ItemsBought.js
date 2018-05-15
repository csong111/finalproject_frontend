import React, { Component } from "react";
import "./App.css";
import Item from "./Item.js";
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import UserAccountButton from './page-elements.js/user-account-button.js';

class ItemsBought extends Component {
    constructor() {
    super();
    this.state = {itemsBought:[]};
  }
 

  render() {
    return (
      <div>
        <NavButton />
        {this.state.userID === "" ? null : <UserAccountButton />}
        {this.state.userID === "" ? null : <CartButton />}
      </div>
    );
  }
}

export default ItemsBought;