import React, {useEffect, useState, useRef} from "react";

// reactstrap components
import {
  Container,
  Row,
  Col, Spinner,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  FormGroup,
  Label,
  Input

} from "reactstrap";
import {
  NavLink as NewNav
} from "react-router-dom";


import Pagination from './Pagination';
import axios from "axios";

class PostsTitle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      posts:[],
      currentPage:1,
      postsPerPage:50,
      url:'http://127.0.1:8000/api/posts1',
      isLoading:false,
      indexOfLastPost:1,
      indexOfFirstPost:1,
      currentPosts:[],
      paginate:2
    };
  }

//   componentDidMount() {
//     this.fetchData();
//     this.state.indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
//     this.state.indexOfFirstPost = this.state.indexOfLastPost - this.state.postsPerPage;
//     this.state.currentPosts = this.state.posts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost);
//   }

//   fetchData = async () => {
    

// this.state.isLoading = true
// console.log("fetch data 1111111111111111", this.state.isLoading)
       
//         try {
//           const result = await axios(this.state.url);
//           // setData(result.data);
//           this.state.posts = result.data;
//           this.state.isLoading = false
//           console.log("fetch data 1111111111111111", this.state.isLoading)
//         } catch (error) {

//         }

  
      // };

      componentDidMount()
      {
        // console.log("fetch data 1111111111111111", this.state.currentPage,  this.state.indexOfFirstPost, this.state.postsPerPage)
        // this.setState({indexOfLastPost: this.state.currentPage * this.state.postsPerPage});
        // this.setState({indexOfFirstPost: this.state.indexOfLastPost - this.state.postsPerPage});
        // this.setState({currentPosts: this.state.posts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost)});
        // this.state.currentPosts = this.state.posts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost);

        this.state.isLoading = true
        console.log("fetch data 1111111111111111", this.state.isLoading)
        setTimeout(() => {
          axios.get(this.state.url).then(
            res =>{
            this.state.isLoading = false
            console.log("fetch data 22222222222222222", this.state.isLoading)
            this.setState({
              posts: res.data
            });
          }
          )
        }, 10000);
        // console.log("fetch data 1111111111111111", this.state.currentPage,  this.state.indexOfFirstPost, this.state.postsPerPage)
        // this.setState({indexOfLastPost: this.state.currentPage * this.state.postsPerPage});
        // this.setState({indexOfFirstPost: this.state.indexOfLastPost - this.state.postsPerPage});
        // this.setState({currentPosts: this.state.posts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost)});
        // this.state.isLoading = false
        // console.log("fetch data 222222222222222222", this.state.indexOfLastPost, this.state.indexOfFirstPost)
      }

  componentDidUpdate() {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
  }

  componentWillUnmount(){
    document.body.classList.remove("profile-page");
    document.body.classList.remove("sidebar-collapse");
  }


  // const [collapseOpen, setCollapseOpen] = React.useState(false);
  // const[posts, setPosts]= useState([])
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setpostsPerPage] = useState(20);
  // const [url, setUrl] = useState(
  //   'http://127.0.1:8000/api/posts1',
  // );
  
  // const [isLoading, setIsLoading] = useState(false);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     didCancel = true
  //     setIsError(false);
  //     setIsLoading(true);
  //     unmounted.current = true
  //     console.log("unmountedd111111", didCancel)
     
  //     try {
  //       const result = await axios(url);
  //       // setData(result.data);
  //       setPosts(result.data);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setIsLoading(false);
  //     didCancel = false
  //     unmounted.current = false
  //     console.log("unmountedd22222222222", didCancel)

  //   };
  //   fetchData();
  // }, []);

  // if(isLoading === true) return <Spinner />



  

  //  // Change page
  //  const paginate = pageNumber => setCurrentPage(pageNumber);

  

  // React.useEffect(() => {
    
  //   document.body.classList.add("profile-page");
  //   document.body.classList.add("sidebar-collapse");
  //   document.documentElement.classList.remove("nav-open");
  //   return function cleanup() {
  //     document.body.classList.remove("profile-page");
  //     document.body.classList.remove("sidebar-collapse");
  //   };
  // });
  render(){
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
            <Col  md={{ size: 4, offset: 4 }} >
              <Navbar className="bg-info" expand="lg" >
                <Container >
                  <NavbarBrand href="#pablo" onClick={e => e.preventDefault()}>
                    Menu
                  </NavbarBrand>
                  <button onClick={() => this.setState({ collapseOpen: false})}
                    
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                  >
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                  </button>
                  <Collapse isOpen={this.state.collapseOpen} navbar>
                    <Nav navbar >
                      {/* <NavItem className="active">

                      

                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <p>Link</p>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <p>Link</p>
                        </NavLink>
                      </NavItem> */}
                      <UncontrolledDropdown nav>
                        <DropdownToggle
                          aria-haspopup={true}
                          caret
                          color="default"
                          href="http://example.com?ref=creativetim"
                          nav
                        >
                          <p>Choose Country</p>
                        </DropdownToggle>
                        <DropdownMenu>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            <FormGroup check>
                            <Label check>
                              <Input type="checkbox"></Input>
                              <span className="form-check-sign"></span>
                              India
                            </Label>
                          </FormGroup>
                          </DropdownItem>
                          {/* <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Another action
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={e => e.preventDefault()}
                          >
                            Something else here
                          </DropdownItem> */}
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </Collapse>
                </Container>
              </Navbar>
            </Col>

            </Row>
            <Row>
                <Col className="ml-auto mr-auto" md="12">
                {this.state.isLoading?
                 <Row>
                   {/* md={{ size: 6, offset: 4 }} */}
                  <Col sm="12" className="text-center" >
                  <h1>YESSSSSSSSSSSSSS</h1>
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="secondary" />
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="success" />
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="danger" />
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="warning" />
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="info" />
                        {/* <Spinner type="grow" color="light" /> */}
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="dark" />
                        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" color="primary" />
                  </Col>
                        </Row>:
                        <Row className="collections">
                       

                  {
                    
                    this.state.posts.map(post => 
                      <Col md="4" key ={post.id}>
                      
                      
                        <NewNav  to={{pathname:"/user_posts",
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
                      </Col>)
                  }
                </Row>
              
              }
                </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Pagination postsPerPage={this.state.postsPerPage}
        totalPosts={this.state.posts.length} paginate={this.state.paginate}
        />
    </>
  );
}
}

export default PostsTitle;
