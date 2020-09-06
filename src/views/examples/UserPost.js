import React, {useEffect,useState} from "react";
import axios from 'axios';
import { Link, NavLink, withRouter } from "react-router-dom";

// reactstrap components
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Input, 
  Popover,
  PopoverHeader, 
  PopoverBody,
  Alert,
  Card,
  CardBody,
  Modal 
} from "reactstrap";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';


// core components

import SinglePostNavbar from "../../container/Navbars/SinglePostNavbar";
import SinglePostHeader from "../../container/Headers/SinglePostHeader";
import DefaultFooter from "../../container/Footers/DefaultFooter.js";

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


function UserPosts(props) {

  const[post, setUserPost] = useState([]);
  const[places, setUserPlaces] = useState([]);
  const[user_image, setUserImage] = useState("");
  const[comment, setComment] = useState("");
  const[comments, setallComments] = useState([])


 

   const submitComment = e => {
    axios.post('http://192.168.100.6:8000/api/comments/create/', {
      comment: comment,
      comment_by:localStorage.user_id,
      post: post.id
  })
  .then(res => {
   
  })
  .catch(err => {
      console.log(err)
  })
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`http://192.168.100.6:8000/api/comments1/${post.id}`);
        console.log("result haiiiiiiiiiiiiiiiiiiiii",  result)
       setallComments(result.data)
      } catch (error) {
      }
    };
    fetchData();
  }, []);

  


  useEffect(()  => {
    console.log("user postsss",props)
    const parts = props.location.search.split('=', 2);
    const the_num  = parts[1];
    const fetchUsers = async () => {
      const res = await axios.get(`http://192.168.100.6:8000/api/posts/${the_num}`);
      console.log("user postsssssssssss...", res.data)

      const user_info = await axios.get(`http://192.168.100.6:8000/retrieve-profile/${res.data.author}/`);
      console.log("setuserrrrrrrrrrrrrrr112344444444444444444441...", user_info,res.data.author )

      setUserImage(user_info.data.detail.profile.profile_pic)
      
      
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
      <SinglePostNavbar post_id ={post.id}/>
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
              
            </Row>
            {comments.length>0?comments.map(comment_is => 
                    <>
                  <Card>
                  <CardBody>
                    <blockquote className="blockquote blockquote-info mb-0">
                      <p>
                        {comment_is.comment}
                      </p>
                      <footer className="blockquote-footer">
                        {/* Someone famous in <cite title="Source Title">Source Title</cite> */}
                        {/* {comment_is.username} */}

                        <NavLink tag={Link} to={{pathname:"/myprofile",
                                      search:`?id=${comment_is.comment_by}`}} >
                        {comment_is.username}
                              </NavLink>


                      </footer>
                    </blockquote>
                  </CardBody>
                </Card>

                    
                </>

                    ):<></>}
           
           {
                props.isAuthenticated ?
                <>
            <FormGroup>
                {/* <Label for="exampleText">Text Area</Label> */}
                <Input type="textarea" name="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                 id="exampleText" placeholder='Post a Comment...'/>
              </FormGroup>
              <Button  onClick={() => submitComment()} className="btn-round" color="info" size="md">
                Post
              </Button>
              </>
              : <></>}

          </Container>
        </div>
        {/* <DefaultFooter /> */}
      </div>
    </>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPosts));

