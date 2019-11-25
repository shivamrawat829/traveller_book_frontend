import React from 'react';
import './Cards.css';
import '../Home.css';
import {
     NavLink
  } from "react-router-dom";



const Cards = (props) =>{

    console.log("ojbfodsjnfdlsnfldsnf", props)
    return(
        // <Router>

        //     <Route  path="/adventure_detail" exact strict>
        //     <AdventureDetail />
        //   </Route>
          
    <div className="col-xl-3 col-lg-6 col-md-6">
    <NavLink to={{pathname:"/adventure_detail",
    state:{
        data:props.alldata.id
    }}}>

        <a href="adventure-detail.html" className="grid_item latest_adventure">
            <figure>
                <div className="score"><strong>{props.alldata.rating}</strong></div>
                <img src={props.alldata.image} width="1100" alt="" height="500" className='img-fluid' />
                {/* <img src={props.alldata.image} width="1100" alt="" height="500" className='img-fluid' /> */}
                <div className="info">
                    <em>{props.alldata.title}</em>
                    <h3>{props.alldata.description}</h3>
                </div>
            </figure>
        </a>
        </NavLink>
    </div>
    // </Router>

    )
}

export default Cards;
