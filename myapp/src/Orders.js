import React, { Component } from 'react';
import NavButton from './page-elements.js/nav-button.js';
import ArtistAccount from './ArtistAccount.js';
import ArtistAccountButton from './page-elements.js/artist-account-button.js';
import LogOutButton from "./page-elements.js/logout-button.js";
import HomeButton from "./page-elements.js/home-button.js";
import { BrowserRouter, withRouter, Route, Link } from 'react-router-dom'

import './App.css';

class Orders extends Component {
    constructor() {
        super();
        this.state={
            artistName:"",
            orders: [],
            previousOrders: false
        }
    }

    componentDidMount = () =>{
        let body = {
            artistName : this.props.artistName
        }
//console.log("getOrders-1",body)
        fetch("/getOrders",{
            method:"POST",
            body : JSON.stringify(body)
        })
        .then(e =>e.text())
        .then (e =>JSON.parse(e))
        // .then(e=>{console.log("getOrders-4", e);return e})
        .then(e =>{
            
            this.setState({orders :e})

            if(e.length>=1){
                this.setState({  previousOrders:true})
            }
            else this.setState({previousOrders:false})
        })
    }
    
    seeArtistAcct = () => {

        this.props.history.push("/artistaccount/"+this.state.artistName)
    }
    
    render() {
    
        let renderTitle = (
                <div className="ordersTable">
                    <div className = "ordersTableData">
                Order #
                    </div>
                    <div className = "ordersTableData">
                Buyer
                    </div>
                    <div className = "ordersTableData">
                Items
                    </div>
                    <div className = "ordersTableData">
                Date
                    </div>
                    <div className = "ordersTableData">
                Fulfilled
                    </div>
                </div>
            )
      
    let renderOrders = this.state.orders.map((order, id )=>{
        return (
            <div key={id} className="ordersTable">
                <div className = "ordersTableData">
            {order._id}<br/>
                </div>
                <div className = "ordersTableData">
            {order.firstName}<br/>
                </div>
                <div className = "ordersTableData">
             {order.cartItems.map((item,id) => <li key={id} className="ordersTableItemNames">{item.name}<br/></li>)}
                </div>
                <div className = "ordersTableData">
            {order.date}<br/>
                </div>
                <div className = "ordersTableData">
            fulfilled<br/>
                </div>
            </div>
        )
    })

        return (
          <div className="ArtistProf">
              <NavButton />
              <HomeButton />
              <ArtistAccountButton/>
              <LogOutButton/>
              <h1>Items sold</h1>
              {!this.state.previousOrders ?
               <div className="failedAccount">No previous orders</div> :
              <div><div>{renderTitle}</div>
              <div>{renderOrders}</div></div>}
          </div>
        );
      }
}

let Content = withRouter(Orders)
export default Content;