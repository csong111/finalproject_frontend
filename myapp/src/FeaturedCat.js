import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import HomeButton from "./page-elements.js/home-button.js";
import CartButton from './page-elements.js/cart-button.js';
import ConnectButton from './page-elements.js/connect-button.js';
import SearchBar from './page-elements.js/search-bar.js';
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class FeaturedCat extends Component {
    constructor() {
        super();
        this.state={
            itemsInCat: [
                // { itemID: '123456', name: "Spring Print", price: 50, artistName: "aisha", img1: '/items/45589157_095_b.jpg', cat: "Spring" },
                // { itemID: '123457', name: "Awesome Emproidery", price: 100, artistName: "caro", img1: '/items/45513033_045_b10.jpg', cat: "Spring" },
            ],
        }
    }

    componentDidMount () {
      fetch("/getCatItems?cat="+this.props.cat, {
        method: 'GET'
      }).then(res=>res.text())
        .then(resB=>{
          let parsed=JSON.parse(resB)
          console.log(parsed)
          this.setState({itemsInCat: parsed})
        })
      //FETCH get itemsInCat by cat name then setState the results endpoint: getCatItems
    }

    render() {
      var itemsRendered = this.state.itemsInCat.map((el,id)=>{
        return (
          <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
          <Item itemID = {el._id} name = {el.name} price = {el.price} artistName = {el.artistName} img1 = {el.img1} />
          </div>
        )
      })

      return (
        <div>
          
        {/* NAV !!!!!!!!!!!!!!!!!!*/}
        <div className="headerElements sticky">
          <NavButton />

          <div className="logo">
            <HomeButton />
          </div>
          
          <div className="search">
            <SearchBar />
          </div>

          <div className="flex">
            {this.props.email !== "" ? <UserAccountButton userID={this.props.userID}  /> : null}
            {this.props.artistName !== "" ? <ArtistAccountButton artistName={this.props.artistName} /> : null}
            {this.props.email === "" && this.props.artistName === "" ? (
              <ConnectButton />
            ) : null}
            {this.props.email !== "" ? <CartButton userID = {this.props.userID}  /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        <h2 className="catName">{this.props.cat}</h2>

        <div name="cat-items" className="row">
          {itemsRendered}
        </div>
        </div>
      );
    }
  }
  
  export default FeaturedCat;