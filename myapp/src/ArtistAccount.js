import React, { Component } from "react";
import UserAccountButton from "./page-elements.js/user-account-button.js";
import ArtistAccountButton from "./page-elements.js/artist-account-button.js";
import LogOutButton from "./page-elements.js/logout-button.js";
import NavButton from "./page-elements.js/nav-button.js";
import CartButton from "./page-elements.js/cart-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import Item from "./page-elements.js/Item.js";
import ConnectButton from "./page-elements.js/connect-button.js";
import SearchBar from "./page-elements.js/search-bar.js";
import { BrowserRouter, withRouter, Route, Link } from "react-router-dom";
import "./App.css";

class ArtistAccount extends Component {
  constructor() {
    super();
    this.state = {
      edit: false,
      artistID: "",
      artistName: "",
      artistNameInput: "",
      bio: "",
      location: "",
      profPicURL: "",
      items: []
    };
  }

  componentDidMount() {
    this.initData();
  }

  initData = () => {
    //console.log(this.props.artistID)
    var body = { artistID: this.props.artistID };
    fetch("/getArtistAccount", {
      method: "POST",
      body: JSON.stringify(body)
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        //console.log(parsed)
        let artistID = parsed._id;
        let artistName = parsed.artistName;
        let bio = parsed.bio;
        let location = parsed.location;
        let profPicURL = parsed.profPicURL;
        this.setState({
          artistID: artistID,
          artistName: artistName,
          bio: bio,
          location: location,
          profPicURL: profPicURL
        });
      });
    fetch("/getArtistAccountItems/?artistID=" + this.props.artistID, {
      method: "GET"
    })
      .then(res => res.text())
      .then(resB => {
        let parsed = JSON.parse(resB);
        // console.log("parsed",parsed)
        this.setState({ items: parsed });
      });
  };

  uploadFile = (x, stateName) => {
    let filename = x.name;
    let fileExtension = filename.split(".").pop();
    this.setState({ imageInputName: x.name });
    fetch("/uploadPicProfile?ext=" + fileExtension, {
      method: "POST",
      body: x
    })
      .then(response => response.text())
      .then(response => this.setState({ [stateName]: response }))
      .then(() => this.state.imageInput);
  };

  createListing = () => {
    this.props.history.push("/createListing/" + this.props.artistID, {
      name: this.state.artistName
    });
  };
  seeOrders = () => {
    this.props.history.push("/orders/" + this.state.artistName);
  };
  editInfo = () => {
    this.setState({ edit: true });
  };

  saveInfo = event => {
    event.preventDefault();
    let bod = this.state;
    fetch("/editArtistAccount", { method: "POST", body: JSON.stringify(bod) })
      .then(e => e.text())
      .then(e => JSON.parse(e))
      // .then(e => {
      //   if (e.success)
      //     this.props.history.push("/artistaccount/" + this.state.artistID);
      // });
      .then((e) => {this.setState({ edit: false })});
  };

  handleArtistNameChange = event => {
    this.setState({ artistName: event.target.value });
  };

  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  };

  handleBioChange = event => {
    this.setState({ bio: event.target.value });
  };

  render() {
    let itemsRendered = this.state.items.map((el, id) => {
      return (
        <div className="col-6 col-md-4 col-lg-3 noPad space" key={id}>
          <Item
            itemID={el._id}
            name={el.name}
            price={el.price}
            artistName={el.artistName}
            img1={el.img1}
          />
        </div>
      );
    });

    let accountInfo = (() => {
      if (this.state.edit === false) {
        return (
          <div>
            <h4>Name: {this.state.artistName}</h4>
            <h4>Location: {this.state.location}</h4>
            <h4>{this.state.bio}</h4>
            <button className="button noPad connect" onClick={this.editInfo}>
              EDIT INFO
            </button>
          </div>
        );
      } else {
        return (
          <form>
            <input
              type="text"
              value={this.state.artistName}
              onChange={this.handleArtistNameChange}
            />
            <br />
            <input
              type="text"
              value={this.state.location}
              onChange={this.handleLocationChange}
            />
            <br />
            <textarea value={this.state.bio} onChange={this.handleBioChange} />
            <br />
            <button onClick={this.saveInfo}>Save Info</button>
          </form>
        );
      }
    })();

    return (
      <div className="ArtistProf">
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
            {this.props.artistID ? (
              <ArtistAccountButton artistID={this.props.artistID} />
            ) : null}
            {this.props.artistID ? <LogOutButton /> : null}
            {!this.props.artistID ? <ConnectButton /> : null}
          </div>
        </div>

        <div className="searchMobile space">
          <SearchBar />
        </div>
        {/* NAV !!!!!!!!!!!!!!!!!!*/}

        <h2 className="artistAccountContainer">MY ACCOUNT</h2>

        <div className="artistAccount space">
          <input
            id="changeProfile"
            style={{ display: "none" }}
            type="file"
            onChange={event =>
              this.uploadFile(event.target.files[0], "profPicURL")
            }
            placeholder="Upload Profile Pic Image"
          />
          <div className="flex">
            <div className="center">
              <img className="profileImage" src={this.state.profPicURL} />
              <br />
              <button
                className="button noPad connect"
                onClick={() => {
                  document.getElementById("changeProfile").click();
                }}
              >
                EDIT PROFILE PICTURE
              </button>
              {/* <img
          onClick={() => {
            document.getElementById("changeProfile").click();
          }}
          src="/ui-elements/profpic.png"
          height="50px"
          width="50px"
        /> */}
            </div>
            <span className="spaceLeft accountInfo">
              {accountInfo}
              <button
                className="button noPad connect"
                onClick={this.createListing}
              >
                CREATE LISTING
              </button>
              <button className="button noPad connect" onClick={this.seeOrders}>
                SEE ORDERS
              </button>
            </span>
          </div>
        </div>

        {/* <h2>CREATE LISTING</h2>
        <button onClick={this.createListing}>Create Listing</button>
        <div className="space" />
        <h2>ORDERS</h2>
        <button onClick={this.seeOrders}>See Orders</button> */}
        <div className="space" />
        <h2>MY ITEMS</h2>
        <div className="row" name="items">
          {itemsRendered}
        </div>
      </div>
    );
  }
}

let Content = withRouter(ArtistAccount);
export default Content;
