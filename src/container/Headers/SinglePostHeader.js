import React, {useState, useEffect} from "react";
// import {
//   NavLink
// } from "reactstrap";

import axios from 'axios';

import { Link, NavLink } from "react-router-dom";

// reactstrap components
import { Container } from "reactstrap";

// core components

function SinglePostHeader(props) {
  let pageHeader = React.createRef();
  React.useEffect(() => {

    console.log("this pageHeaderpageHeaderpageHeaderpageHeader", pageHeader)

    if (window.innerWidth > 991) {
      // if (pageHeader.current !== null){
      //   const updateScroll = () => {
      //     let windowScrollTop = window.pageYOffset / 3;
      //     pageHeader.current.style.transform =
      //       "translate3d(0," + windowScrollTop + "px,0)";
      //   };
      //   window.addEventListener("scroll", updateScroll);
      //   return function cleanup() {
      //     window.removeEventListener("scroll", updateScroll);
      //   };
      // }
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: `url(${props.image})`
           
          }}
          ref={pageHeader}

        ></div>
        <Container>
          
          <NavLink tag={Link} to={{pathname:"/myprofile",
                                      search:`?id=${props.author}`}} >
          <div className="photo-container">
          <img alt="..." src={props.profile_pic}></img>
          </div>
                </NavLink>
            
         
        </Container>
      </div>
    </>
  );
}

export default SinglePostHeader;
