import React, {useEffect, useState} from "react";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";
import {
  NavLink
} from "react-router-dom";


import Pagination from './Pagination';
import axios from "axios";

function PostsTitle() {
  const[posts, setPosts]= useState([])
  const[loading, setLoading] = useState([false])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(9);


  
  useEffect(()  => {

    const fetchPosts = async () => {
      setLoading(true);
      console.log("loading ....")
      const res = await axios.get("http://127.0.1:8000/api/posts1");
      // const res = await axios.get("https://jsonplaceholder.typicode.com/photos");
      // .then(res =>{
      //   console.log(res)
      //   setPosts(res.data);
      // }
      //   )
      //   .catch(err => {
      //     console.log(err)
      //   });

      setPosts(res.data);
      setLoading(false);
      console.log("loading ENDD....",res.data)
    };

    fetchPosts();}, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

  

  React.useEffect(() => {
    
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

      <div className="wrapper">
        <div className="section">
          <Container>
            <h3 className="title">See Most Popular Posts...</h3>
            <h5 className="description">
            You will Love it
            </h5>
            <Row>
                <Col className="ml-auto mr-auto" md="10">
                <Row className="collections">

                  {
                    currentPosts.map(post => 
                      <Col md="4" key ={post.id}>
                        <NavLink to={{pathname:"/user_posts",
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
                        
                      </NavLink>
                      </Col>)
                  }
                </Row>
                </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Pagination postsPerPage={postsPerPage}
        totalPosts={posts.length} paginate={paginate}
        />
    </>
  );
}

export default PostsTitle;
