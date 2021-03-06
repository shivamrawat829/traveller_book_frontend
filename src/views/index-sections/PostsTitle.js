import React from "react";

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
  Nav,
  FormGroup,
  Label,
  Input, 
} from "reactstrap";
import {
  NavLink as NewNav
} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

class PostsTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      posts:[],
      isLoading:false,
      currentPosts:[],
      count: 30,
      start: 1

    };
  }


      componentDidMount()
      {
        // const { count, start } = this.state;
        this.setState({ isLoading: true });
        
        const parts = this.props.location.search.split('=', 2);
        // const the_num  = parts[1];
        const the_num  = 10
        setTimeout(() => {
          // axios.get(`http://127.0.1:8000/api/posts1?count=${the_num}&start=${this.state.start}`).then(
            // axios.get(`http://192.168.100.6:8000/api/posts/${this.state.start}/${the_num}`).then(
              axios.get(`http://192.168.100.6:8000/api/posts`).then(
            res =>{
              this.setState({ isLoading: false });
            console.log("tdataaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", res.data)
            this.setState({
              posts: res.data
            });
          }
          )
        }, 2000);
      }

      fetchImages = () => {
        // const { count, start } = this.state;
        const parts = this.props.location.search.split('=', 2);
        // const the_num  = parts[1];
        const the_num  = 10;
        this.setState({ start: this.state.start + parseInt(the_num) });
        console.log("fetch images called", this.state.start, the_num)
        axios
          .get(`http://127.0.1:8000/api/posts/${this.state.start}/${the_num}`)
          .then(res =>
            this.setState({ posts: this.state.posts.concat(res.data) })
          );
      };

  componentDidUpdate() {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
  }

  componentWillUnmount(){
    document.body.classList.remove("profile-page");
    document.body.classList.remove("sidebar-collapse");
  }

  render(){
  return (
    <>
      <div className="wrapper">
        <div className="section">
          <Container>
            {/* <h3 className="title">See Most Popular Posts...</h3>
            <h5 className="description">
            You will Love it
            </h5> */}
            {/* <Row>
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
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </Nav>
                  </Collapse>
                </Container>
              </Navbar>
            </Col>

            </Row> */}
            <Row>
                <Col className="ml-auto mr-auto" md="12">
                {this.state.isLoading?
                 <Row>
                   {/* md={{ size: 6, offset: 4 }} */}
                  <Col sm="12" className="text-center" >
                
                        {/* <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="primary" /> */}
                        {/* <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="secondary" /> */}
                        {/* <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="success" /> */}
                        {/* <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="danger" /> */}
                        {/* <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="warning" /> */}
                        <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="info" />
                        {/* <Spinner type="grow" color="light" /> */}
                        {/* <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="dark" /> */}
                        {/* <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="primary" /> */}
                  </Col>
                        </Row>:
                         <InfiniteScroll
                         dataLength={this.state.posts.length}
                         next={this.fetchImages}
                         hasMore={true}
                        //  loader={ <Spinner style={{ width: '3rem', height: '3rem' }}
                          // type="grow" color="primary" />}
                       >
                        <Row className="collections">
                       
              
                  {
                    this.state.posts.map(post => 
                      <Col md="4" key ={post.id}> 
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
                              // key = {post.id}
                              >
                          </img>
                        
                

                    {/* 
                    <Card style={{ width: "20rem" }}>
                    <CardImg alt="..." src={post.image} top></CardImg>
                    <CardBody>
                      <CardTitle tag="h4">{post.title}</CardTitle>
                      <CardText>
                        {post.description}
                      </CardText>
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                      >
                        Go somewhere
                      </Button>
                    </CardBody>
                  </Card> */}
                        </NewNav>


                      </Col>)
                  }
                 
                
                </Row>
                </InfiniteScroll>
              }
                </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
}

export default PostsTitle;
