/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Alert } from "reactstrap";

// core components

function IndexHeader(props) {
  let pageHeader = React.createRef();
  const [alert1, setAlert1] = React.useState(true);
  const [alert2, setAlert2] = React.useState(true);

  React.useEffect(() => {
    console.log("is uploading inbdexxxxxxxxxxxxxx",props.is_uploading)
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
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/scene3.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>

        <div className="section section-notifications">

        {props.is_uploading ? 
      <Alert color="info" isOpen={alert2}>
      <Container>
        <div className="alert-icon">
          <i className="now-ui-icons travel_info"></i>
        </div>
      We are Uploading Your Post!!! Meanwhile you can sit Relax...
        <button
          type="button"
          className="close"
          onClick={() => setAlert2(false)}
        >
          <span aria-hidden="true">
            <i className="now-ui-icons ui-1_simple-remove"></i>
          </span>
        </button>
      </Container>
    </Alert>
    :
    <Alert color="success" isOpen={alert1}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons ui-2_like"></i>
            </div>
            Your Post is Uploaded Successfully...
            <button
              type="button"
              className="close"
              onClick={() => setAlert1(false)}
            >
              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
          </Container>
        </Alert>

      }
        </div>
          <div className="content-center brand">
            <img
              alt="..."
              className="n-logo"
              src={require("../../assets/img/logos/logo.png")}
            ></img>
            <h1 className="h1-seo">Traveller Book.</h1>
            <h3>Start Your Journey Today.</h3>
          </div>
          {/* <h6 className="category category-absolute">
            Designed by{" "}
            <a href="http://invisionapp.com/?ref=creativetim" target="_blank">
              <img
                alt="..."
                className="invision-logo"
                src={require("../../assets/img/invision-white-slim.png")}
              ></img>
            </a>
            . Coded by{" "}
            <a
              href="https://www.creative-tim.com?ref=nukr-index-header"
              target="_blank"
            >
              <img
                alt="..."
                className="creative-tim-logo"
                src={require("../../assets/img/creative-tim-white-slim2.png")}
              ></img>
            </a>
            .
          </h6> */}
        </Container>
      </div>
    </>
  );
}

export default IndexHeader;
