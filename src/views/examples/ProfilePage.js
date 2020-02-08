import React, {useEffect,useState} from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';


// core components

import ExamplesNavbar from "../../container/Navbars/ExamplesNavbar";
import ProfilePageHeader from "../../container/Headers/ProfilePageHeader";
import DefaultFooter from "../../container/Footers/DefaultFooter";


const mapStateToProps = (state) => {
  console.log("profile page is authenticate", state)
  
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


function ProfilePage(props) {
  const [pills, setPills] = React.useState("1");

  const[user, setUser] = useState([]);

  
  
  useEffect(()  => {
    console.log("PRORRRRRRRRRRRRRRRRRRRRRRR",props.location.search)
    const parts = props.location.search.split('=', 2);
    const the_num  = parts[1];

    console.log("PRORRRRRRRRRRRRRRRRRRRRRRR22222",localStorage.token)


    const fetchUsers = async () => {
      // setLoading(true);
      // console.log("loading ....")
      const res = await axios.get(`http://127.0.0.1:8000/users/posts/${the_num}`);

      const user_info = await axios.get(`http://127.0.0.1:8000/users/posts/${localStorage.token}`);


   
      // console.log("userssssssssssssss...", res)
      setUser(res.data)
  

      console.log("setuserrrrrrrrrrrrrrr...", res.data)

    };

    fetchUsers();
  }, []);

  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });




  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="wrapper">
        <ProfilePageHeader {...user}/>
        <div className="section">
          <Container>
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg">
                Follow
              </Button>

              
              {/* <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip515203352"
                size="lg"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip515203352">
                Follow me on Twitter
              </UncontrolledTooltip>
              <Button
                className="btn-round btn-icon"
                color="default"
                id="tooltip340339231"
                size="lg"
              >
                <i className="fab fa-instagram"></i>
              </Button>
              <UncontrolledTooltip delay={0} target="tooltip340339231">
                Follow me on Instagram
              </UncontrolledTooltip> */}
            </div>
            <h3 className="title">About me</h3>
            <h5 className="description">
            Roamer who loves to explore new places...
            </h5>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">My Posts</h4>
                <div className="nav-align-center">
                  <Nav
                    className="nav-pills-info nav-pills-just-icons"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        className={pills === "1" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("1");
                        }}
                      >
                        <i className="now-ui-icons design_image"></i>
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink
                        className={pills === "2" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("2");
                        }}
                      >
                        <i className="now-ui-icons location_world"></i>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={pills === "3" ? "active" : ""}
                        href="#pablo"
                        onClick={e => {
                          e.preventDefault();
                          setPills("3");
                        }}
                      >
                        <i className="now-ui-icons sport_user-run"></i>
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                </div>
              </Col>
              
              <TabContent className="gallery" activeTab={"pills" + pills}>
                <TabPane tabId="pills1">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg1.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg3.jpg")}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg8.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg7.jpg")}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane>
                {/* <TabPane tabId="pills2">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg6.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg11.jpg")}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg7.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg8.jpg")}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane> */}
                {/* <TabPane tabId="pills3">
                  <Col className="ml-auto mr-auto" md="10">
                    <Row className="collections">
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg3.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg8.jpg")}
                        ></img>
                      </Col>
                      <Col md="6">
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg7.jpg")}
                        ></img>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg6.jpg")}
                        ></img>
                      </Col>
                    </Row>
                  </Col>
                </TabPane> */}
              </TabContent>
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
