import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import UserAccount from './UserAccount.js';
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import "./App.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      featuredCat: [
        { name: "Spring", imageURL: "collections/image1.jpg" },
        { name: "Popular", imageURL: "collections/image2.jpg" },
        { name: "Featured Items", imageURL: "collections/image3.jpg" }
      ],
      randomItems: [
        {
          itemID: "123456",
          name: "Spring Print",
          price: 50,
          artistName: "aisha",
          imageURL: "print.jpg"
        },
        {
          itemID: "123457",
          name: "Awesome Emproidery",
          price: 100,
          artistName: "caro",
          imageURL: "embroidery.jpg"
        }
      ],
      email: "jen@email.com",
      query: ""
    };
  }
  seeItemsInCat = () => {};
  render() {
    let featuredCollection = this.state.featuredCat.map((el, id) => {
      return (
        <div key={id}>
          <Link to = {"/featuredcat/" + el.name}><img src = {el.imageURL} /></Link>
          <br />
          <p>{el.name}</p>
        </div>
      );
    });
    return (
      <div>
        <NavButton />
        <h1>LOGO</h1>
        {this.props.email !== "" ? <UserAccountButton /> : null}
        {this.props.aName !== "" ? <ArtistAccountButton /> : null}
        {this.props.email !== "" || this.props.aName !== "" ? <ConnectButton /> : null}
        {this.props.email !== "" ? <CartButton /> : null}
        <SearchBar />
        <h2>Featured collection</h2>
        <div name="categories">
            {featuredCollection}
        </div>
      </div>
    );
  }
}

export default Home;
