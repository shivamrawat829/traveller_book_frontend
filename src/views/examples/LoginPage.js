import React from "react";
import {withRouter, NavLink} from "react-router-dom";

// reactstrap components
import {Button,Card,CardHeader,CardBody,CardFooter,Form,Input,InputGroupAddon,InputGroupText,InputGroup,
  Container,Col,FormFeedback,FormGroup,FormText,Label,Spinner
} from "reactstrap";
import axios from "axios";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

// core components
import ExamplesNavbar from "../../container/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../container/Footers/TransparentFooter.js";

const mapStateToProps = (state) => {
  console.log("is authenticated", state.token)

  

  
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


function LoginPage(props) {
  const [leftFocus, setLeftFocus] = React.useState(false);
  const [rightFocus, setRightFocus] = React.useState(false);

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const[error, setError] = React.useState('')

  const[loading, setLoading] = React.useState(false)

  // const[setError] = React.useState('')


  const settingError = (event) =>{
    console.log("error", event)
    setError("password is incorrect");
  };

  const settingLoading = (event) =>{
    console.log("loadingloadingloadingloadingloading", loading)
    setLoading(true);
    console.log("loadingloadingloadingloadingloading", loading)

  };


  React.useEffect(() => {
    console.log("LOdingggggggggggggggggggggg", props)

    if (props.isAuthenticated === true)
  {
    console.log("yes it is")
    props.history.push('index');
  }

    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });

  const submitHandler = e => {
    
    
    console.log("eeeeeeeeeeeeeeeeeeeeeeee", e, "ibfdijbfdskjbofb","email", email, "pasword", password)

    if (password.length < 5) {
      e.preventDefault();
      settingError();
      
    }

    else{
      // settingLoading();
      e.preventDefault();
      props.onAuth(email, password);
      // setLoading(false);
      // setLoading(false)
      // props.history.push('index');
      
    }
    
	  // props.history.push('index');
    // e.preventDefault();
  }



  return (
    <>
      <ExamplesNavbar />
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/scene1.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
  

            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form onSubmit={submitHandler} action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("../../assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>


                    

                  <FormGroup>
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <Input
                      aria-describedby="emailHelp"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      type="text"
                      
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email} onChange={e => setEmail(e.target.value)}

                    ></Input>
                    <FormText className="text-muted" color="default" id="emailHelp">
                      We'll never share your email with anyone else.
                    </FormText>
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <Input
                      id="exampleInputPassword1"
                      placeholder="Password"
                      type="password"
                      onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        value={password}
                        onChange={e => setPassword(e.target.value)}

                    ></Input>
                    {/* <FormFeedback>{error}</FormFeedback> */}
                    {/* <FormFeedback>Oh noes! that name is already taken</FormFeedback> */}
                    <h6 style={{color:'red',}}>{error}</h6>
                  </FormGroup>
                  <FormFeedback>ihbbjk{error}</FormFeedback>

                  
                  

                  {/* <InputGroup
                    className={
                      "no-border input-lg" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input invalid
                      placeholder="Email..."
                      type="text"
                      
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email} onChange={e => setEmail(e.target.value)}

                    ></Input>
                    <FormFeedback>{error}</FormFeedback>
                  </InputGroup> */}


                  {/* <FormGroup check>
                    <Label check>
                      <Input type="checkbox"></Input>
                      <span className="form-check-sign"></span>
                      Check me out
                    </Label>
                  </FormGroup> */}
                  {/* <Button color="primary" type="submit">
                    Submit
                  </Button>




                  <InputGroup className={leftFocus ? "input-group-focus" : ""}>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-user-circle"></i>
                    </InputGroupText>
                  </InputGroupAddon>

                  
                  <Input
                  className='form-control-danger'
                    placeholder="Left Font Awesome Icon"
                    type="text"
                    onFocus={() => setLeftFocus(true)}
                    onBlur={() => setLeftFocus(false)}
                  ></Input>
                 
                </InputGroup>



                  <InputGroup
                    className={
                      "no-border input-lg" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input invalid
                      placeholder="Email..."
                      type="email"
                      
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email} onChange={e => setEmail(e.target.value)}

                    ></Input>
                     <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                  </InputGroup>
                  
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password..."
                        type="password"
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        value={password}
                         onChange={e => setPassword(e.target.value)}

                      ></Input>
                    </InputGroup> */}
                  
                   

                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      // href="#pablo"
                      // onClick={e => e.preventDefault()}
                      // onClick={settingError}
                      size="md"
                    >
                      Login
                    </Button>

                    
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          to='/signup-page'
                          href="http://localhost:3000/signup-page"
                          onClick={e => e.preventDefault()}
                        >
                          Create Account
                        </a>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          Need Help?
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        <TransparentFooter />
      </div>
    </>
  );
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
