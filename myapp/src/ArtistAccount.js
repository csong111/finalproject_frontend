import React, { Component } from 'react';
import UserAccountButton from './page-elements.js/user-account-button.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import NavButton from './page-elements.js/nav-button.js';
import CartButton from './page-elements.js/cart-button.js';
import Item from "./page-elements.js/Item.js"
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'
import './App.css';

class ArtistAccount extends Component {
    constructor() {
      super();
      this.state={
        artistProfile: {
          artistName: "caro",
          bio: "I'm a cool artist",
          location: "Montreal, Canada",
          imageURL: "mypic.jpg",
          items: [
              { itemID: '123457', name: "Awesome Embroidery", price: 100, artistName: "caro", imageURL: 'embroidery.jpg', cat: "Spring", blurb: "Best embroidery ever!", quantity: 1 },
              { itemID: '123458', name: "Pillow", price: 100, artistName: "caro", imageURL: 'pillow.jpg', cat: "Popular", blurb:"Best pillow ever!", quantity: 2 },
          ],
      }
      }
    }
    createListing = (artistName) => {
      this.props.history.push("/createListing/")
    }
    seeOrders = () => {
      this.props.history.push("/orders/" + this.state.artistProfile.artistName)
    }
    editInfo = () => {

    }

    render() {
      var itemsRendered = this.state.artistProfile.items.map((el,id)=>{
        return (
          <Item itemID = {el.itemID} name = {el.name} price = {el.price} artistName = {el.artistName} imageURL = {el.imageURL} artistName = {this.state.artistProfile.artistName} />
        )
      })
      

        return (
          <div className="ArtistProf">
              <NavButton />
              {this.props.aName === "" ? null : <ArtistAccountButton />}

              <h2>MY ACCOUNT</h2>
              <input id="changeProfile" style={{display:"none"}} type="file" onChange={event => this.uploadFile(event.target.files[0])} />
              {this.state.artistProfile.imageURL !== "" ? <img src={this.state.artistProfile.imageURL}/> : 
              <img src="/items/addimage.png" height="50px" width="50px"/>
              }
              <br/>
              <input value="Change Profile Pic" type="submit" onClick={()=>{document.getElementById("changeProfile").click()}}/>

              <p>Name: {this.state.artistProfile.artistName}</p>
              <p>Location: {this.state.artistProfile.location}</p>
              <p>{this.state.artistProfile.bio}</p>
              <button onClick = {this.editInfo}>Edit Info</button>

              <h2>ORDERS</h2>
              <button onClick = {this.seeOrders}>See Orders</button>

              <h2>MY ITEMS</h2>
              <div name="items">
              {itemsRendered}
              </div>
              <button onClick = {this.createListing}>Create Listing</button>
              
          </div>
        );
      }
    }
    

let Content = withRouter(ArtistAccount)
export default Content;
