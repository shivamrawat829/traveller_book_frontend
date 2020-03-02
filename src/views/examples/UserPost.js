import React, {useEffect,useState} from "react";
import axios from 'axios';

// reactstrap components
import {
  Container,
  Row,
  Col,
} from "reactstrap";



// core components

import SinglePostNavbar from "../../container/Navbars/SinglePostNavbar";
import SinglePostHeader from "../../container/Headers/SinglePostHeader";
import DefaultFooter from "../../container/Footers/DefaultFooter.js";

function UserPosts(props) {
  const[post, setUserPost] = useState([]);
  const[places, setUserPlaces] = useState([]);
  const[user_image, setUserImage] = useState("");

  useEffect(()  => {
    console.log("user postsss",props)
    const parts = props.location.search.split('=', 2);
    const the_num  = parts[1];
    const fetchUsers = async () => {
      const res = await axios.get(`http://127.0.1:8000/api/posts/${the_num}`);
      console.log("user postsssssssssss...", res.data)

      const user_info = await axios.get(`http://127.0.0.1:8000/info/user/${res.data.author}`);
      setUserImage(user_info.data.user_profile.image)
      console.log("setuserrrrrrrrrrrrrrr112344444444444444444441...", user_info.data)
      
      setUserPost(res.data)
      setUserPlaces(res.data.places)
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
        <SinglePostHeader {...post} profile_pic={user_image}/>
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
