import React, {useEffect,useState} from "react";
import axios from 'axios';

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



// core components

import SinglePostNavbar from "../../container/Navbars/SinglePostNavbar";
import SinglePostHeader from "../../container/Headers/SinglePostHeader";
import DefaultFooter from "../../container/Footers/DefaultFooter.js";

function UserPosts(props) {
  const [pills, setPills] = React.useState("2");

  const[post, setUserPost] = useState([]);
  const[places, setUserPlaces] = useState([]);

  useEffect(()  => {
    console.log("user postsss",props)
    const parts = props.location.search.split('=', 2);
    const the_num  = parts[1];

    // console.log("userpostsssssssss",the_num)


    const fetchUsers = async () => {
      // setLoading(true);
      // console.log("loading ....")
      const res = await axios.get(`http://127.0.1:8000/api/posts/${the_num}`);

   
      console.log("userssssssssssssss...", res.data)
      setUserPost(res.data)
      setUserPlaces(res.data.places)
  

      // console.log("userpostpksmdkls...", res.data)

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
      <SinglePostNavbar />
      <div className="wrapper">
        <SinglePostHeader {...post}/>
        <div className="section">
          <Container>
           
           
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h4 className="title text-center">{post.title}</h4> 
                <h4 className="title text-center">{post.place}</h4> 
                <h3 className="title">About this Place</h3>
            <h5 className="description">
           {post.description}
            </h5>
              </Col>
              
             
                  <Col className="ml-auto mr-auto" md="10">

                  {
                    places.map(place => 
                      <Row key={place.id} className="justify-content-center">
                      <Col lg="12" md="12">
                      <img
                          alt="..."
                          className="img-raised"
                          src={place.image}
                        ></img>
                      <h4 className="title text-center">{place.place}</h4> 
                      <h5 className="description">
                      {place.description}
                      </h5>

                       
                        </Col>
                        {/* <Col lg="8" md="12">
                        <br/>
                        <br/>
                        <img
                          alt="..."
                          className="img-raised"
                          src={require("../../assets/img/bg3.jpg")}
                          >
                        </img>
                      </Col> */}
                      </Row>




                      
                      )
                  }

                  
                  </Col>
               
{/*               
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
                  </Col> */}
              
            </Row>
          </Container>
        </div>
        <DefaultFooter />
      </div>
    </>
  );
}

export default UserPosts;
