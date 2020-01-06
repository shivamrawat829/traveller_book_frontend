import React, {useState} from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function SinglePostHeader(props) {
  let pageHeader = React.createRef();

  React.useEffect(() => {

    console.log("this time", props)
   

    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
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
          <div className="photo-container">
            <img alt="..." src={props.image}></img>
          </div>
        </Container>
      </div>
    </>
  );
}

export default SinglePostHeader;
