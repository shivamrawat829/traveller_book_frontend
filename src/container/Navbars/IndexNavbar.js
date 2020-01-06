import React, { useState } from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

// import SignUp from '../../views/index-sections/SignUp';
// import axios from 'axios';
import {withRouter} from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';



const mapStateToProps = (state) => {
  console.log("is authenticated", state.token)
  return {
      loading: state.loading,
  error: state.error,
  isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
  onAuth: (username, password) => dispatch(actions.authLogin(username, password)) ,
  logout: () => dispatch(actions.logout()) 
  }
}

function IndexNavbar(props) {

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);


  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 399 ||
        document.body.scrollTop > 399
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 400 ||
        document.body.scrollTop < 400
      ) {
        setNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("scroll", updateNavbarColor);
    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={"fixed-top " + navbarColor} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              href="https://demos.creative-tim.com/now-ui-kit-react/#/index?ref=nukr-index-navbar"
              target="_blank"
              id="navbar-brand"
            >
              About Us
            </NavbarBrand>
            {/* <UncontrolledTooltip target="#navbar-brand">
              Designed by Invision. Coded by Creative Tim
            </UncontrolledTooltip> */}
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>

            <NavItem>
                <NavLink

                href = 'landing-page'
               
                >
                  <i className="now-ui-icons travel_info"></i>
                  <p>About Us</p>
                </NavLink>
              </NavItem>

{/* 
              <NavItem>
                <NavLink
                  href="#pablo"
                  onClick={e => {
                    e.preventDefault();
                    document
                      .getElementById("download-section")
                      .scrollIntoView();
                  }}
                >
                  <i className="now-ui-icons arrows-1_cloud-download-93"></i>
                  <p>Download</p>
                </NavLink>
              </NavItem> */}
              {/* <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  href="#pablo"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Components</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/index" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    All components
                  </DropdownItem>
                  <DropdownItem
                    href="https://demos.creative-tim.com/now-ui-kit-react/#/documentation/introduction?ref=nukr-index-navbar"
                    target="_blank"
                  >
                    <i className="now-ui-icons design_bullet-list-67 mr-1"></i>
                    Documentation
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}

              {
                    props.isAuthenticated ?
                    <NavItem>
                    <NavLink href = 'profilepage'>
                      <i className="now-ui-icons ui-1_settings-gear-63"></i>
                      <p>Settings</p>
                    </NavLink>
                  </NavItem>
              :
             
              <NavItem>
                <Button
                  className="nav-link btn-neutral"
                  color="info"
                  href="/login-page"
                  id="upgrade-to-pro"
                  // onClick={toggle}
                >
                  <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                  <p>Login/Signup</p>

                  {/* <Modal isOpen={modal} toggle={toggle} className={className}>
                      <SignUp/>
                  </Modal> */}


                </Button>
                {/* <UncontrolledTooltip target="#upgrade-to-pro">
                  Cooming soon!
                </UncontrolledTooltip> */}
              </NavItem>
              }
              {
                    props.isAuthenticated ?
              <NavItem>
                    <NavLink onClick={props.logout}  href = "">
                      <i className="now-ui-icons media-1_button-power"></i>
                      <p>Logout</p>
                    </NavLink>
                  </NavItem>
                  :
                  <></>
              }



              <NavItem>
                <NavLink
                  href="https://twitter.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  id="twitter-tooltip"
                >
                  <i className="fab fa-twitter"></i>
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
                <UncontrolledTooltip target="#twitter-tooltip">
                  Follow us on Twitter
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.facebook.com/CreativeTim?ref=creativetim"
                  target="_blank"
                  id="facebook-tooltip"
                >
                  <i className="fab fa-facebook-square"></i>
                  <p className="d-lg-none d-xl-none">Facebook</p>
                </NavLink>
                <UncontrolledTooltip target="#facebook-tooltip">
                  Like us on Facebook
                </UncontrolledTooltip>
              </NavItem>
              <NavItem>
                <NavLink
                  href="https://www.instagram.com/d_sarcastic_meme/"
                  target="_blank"
                  id="instagram-tooltip"
                >
                  <i className="fab fa-instagram"></i>
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
                <UncontrolledTooltip target="#instagram-tooltip">
                  Follow us on Instagram
                </UncontrolledTooltip>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(IndexNavbar));
