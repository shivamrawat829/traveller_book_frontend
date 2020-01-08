import React, {useEffect, useState, useRef} from "react";

// reactstrap components
import {
  Container,
  Row,
  Col, Spinner
} from "reactstrap";
import {
  NavLink
} from "react-router-dom";


import Pagination from './Pagination';
import axios from "axios";

function PostsTitle() {
  const[posts, setPosts]= useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(100);
  const [url, setUrl] = useState(
    'http://127.0.1:8000/api/posts1',
  );
  
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const unmounted = useRef(false)
  let didCancel = false;


  useEffect(() => {
    const fetchData = async () => {
      didCancel = true
      setIsError(false);
      setIsLoading(true);
      unmounted.current = true
      console.log("unmountedd111111", didCancel)
     
      try {
        const result = await axios(url);
        // setData(result.data);
        setPosts(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
      didCancel = false
      unmounted.current = false
      console.log("unmountedd22222222222", didCancel)

    };
    fetchData();
  }, []);

  // if(isLoading === true) return <Spinner />



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
                <Col className="ml-auto mr-auto" md="12">

                {didCancel ? (
                  <div>Loading ...</div>
                ) : (
                  <h1>not lodingggggggg</h1>
                )}


                {didCancel?
                        <Spinner type="grow" color="success" />:
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
              
              }

                
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
