import React, {useEffect,useState} from "react";
import axios from 'axios';
import {withRouter,NavLink as NewNav} from "react-router-dom";

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
} from "reactstrap";

import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';


// core components

import ExamplesNavbar from "../../container/Navbars/ExamplesNavbar";
import ProfilePageHeader from "../../container/Headers/ProfilePageHeader";
import DefaultFooter from "../../container/Footers/DefaultFooter";


const mapStateToProps = (state) => {
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
  const[user_posts, setUserPosts] = useState([]);
  const[my_profile, isMyProfile] = useState(false);

  const[user_image, setUserImage] = useState("");
  const[cover_pic, setCoverpic] = useState("");
  const[about_user, setAboutUser] = useState("");



  
  
  useEffect(()  => {
    // console.log("PRORRRRRRRRRRRRRRRRRRRRRRR",props.location.search)
    const parts = props.location.search.split('=', 2);
    const user_id  = parts[1];

    // console.log("token and id",localStorage.token, localStorage.user_id)

    if (user_id === localStorage.user_id){

      isMyProfile(true)

    }
    else{
      isMyProfile(false)
    }


    const fetchUsers = async () => {
      // setLoading(true);
      console.log("loading ....")
      const user_info = await axios.get(`http://192.168.100.6:8000/retrieve-profile/${user_id}/`);

      // const user_info = await axios.get(`http://127.0.0.1:8000/info/user/${localStorage.user_id}`);
      setUser(user_info.data)
      setUserPosts(user_info.data.blog_posts)
      setUserImage(user_info.data.user_profile.image)
      setAboutUser(user_info.data.user_profile.about_me)
      setCoverpic(user_info.data.user_profile.cover_pic)
  

      // console.log("setuserrrrrrrrrrrrrrr...", user_info.data)

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
      <ExamplesNavbar />
      <div className="wrapper">
        <ProfilePageHeader {...user} my_profile={my_profile} about_user ={about_user}
        cover_pic={cover_pic} user_image={user_image} />
        <div className="section">
          <Container>
            <div className="button-container">

              {my_profile ? <></>:

              <Button className="btn-round" color="info" size="lg">
              Follow
            </Button>

              }
              
              
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
            <h4 className="title text-center">{user.first_name} Posts</h4>
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

                      
                  {
                    user_posts.map(post => 
                      <Col md="6" key={post.id}>

                      <NewNav  to={{pathname:"/user-post",
                                      search:`?id=${post.id}`,
                                      hash:`#${post.place}`,
                                  state:{
                                      post_id:post.id
                                  }}}>
                        
                          <img
                              alt="..."
                              className="img-raised"
                              src={post.image}    
                              key = {post.id}>
                          </img>
                        
                      </NewNav>

                      
                      {/* <img
                        alt="..."
                        className="img-raised"
                        src={post.image}
                      ></img> */}
                      {/* <img
                        alt="..."
                        className="img-raised"
                        src={require("../../assets/img/bg3.jpg")}
                      ></img> */}
                    </Col>
                      
                      )
                    }

{/* 
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
                      </Col> */}
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
