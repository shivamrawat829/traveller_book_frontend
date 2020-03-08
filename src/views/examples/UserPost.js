import React, {useEffect,useState} from "react";
import axios from 'axios';

// reactstrap components
import {
  Container,
  Row,
  Col,
  FormGroup,
  Button,
  Input
} from "reactstrap";



// core components

import SinglePostNavbar from "../../container/Navbars/SinglePostNavbar";
import SinglePostHeader from "../../container/Headers/SinglePostHeader";
import DefaultFooter from "../../container/Footers/DefaultFooter.js";

function UserPosts(props) {
  const[post, setUserPost] = useState([]);
  const[places, setUserPlaces] = useState([]);
  const[user_image, setUserImage] = useState("");
  const[comment, setComment] = useState("");
  const[comments, setallComments] = useState([])


   const submitComment = e => {
    axios.post('http://127.0.0.1:8000/api/comments/create/', {
      comment: comment,
      comment_by:localStorage.user_id,
      post: post.id
  })
  .then(res => {
      console.log("delkioooooooooooooooooo", res)
   
  })
  .catch(err => {
      console.log(err)
  })


    console.log("chalaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  }

  React.useEffect(() => {
    console.log("prpsssssss 0000000000 navbar", props)
    const fetchData = async () => {
      try {
        console.log("prpsssssss 1111111in navbar", props)
        const result = await axios('http://127.0.0.1:8000/api/comments');
        console.log("result haiiiiiiiiiiiiiiiiiiiii",  result)
       setallComments(result.data)
      } catch (error) {
      }
    };
    fetchData();
  }, [submitComment]);

  


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
              
            </Row>
            {
                    comments.map(comment_is => 
                    <h6 key={comment_is.id}>{comment_is.comment}</h6>
                    )}

            <FormGroup>
                {/* <Label for="exampleText">Text Area</Label> */}
                <Input type="textarea" name="text"
                value={comment}
                onChange={e => setComment(e.target.value)}
                 id="exampleText" placeholder='Post a Comment...'/>
              </FormGroup>
              <Button onClick={() => submitComment()} className="btn-round" color="info" size="md">
                Post
              </Button>
          </Container>
        </div>
        {/* <DefaultFooter /> */}
      </div>
    </>
  );
}

export default UserPosts;
