import React from "react";
import {withRouter} from "react-router-dom";
import { Link } from "react-router-dom";

// reactstrap components
import {Button,Card,CardHeader,CardBody,CardFooter,Form,Input,
  Container,Col, Spinner, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
// import axios from "axios";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

// core components
import ExamplesNavbar from "../../container/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../container/Footers/TransparentFooter.js";

import axios from 'axios';

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


function LoginPage(props) {
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const[error, setError] = React.useState('')
  const [lastFocus, setLastFocus] = React.useState(false);
  const [sent_email, setSentEmail] = React.useState("");
  const [sent_email_bool, setSentEmailBool] = React.useState(false);
  // const[setError] = React.useState('')
  const settingError = (event) =>{
    setError("Password or Email cannot be Empty...");
  };

  React.useEffect(() => {
    // console.log("yes it is")
    if (password.length >= 1 & email.length >= 1)
    {
      setError("")
    }

    if (props.isAuthenticated === true)
  {
    
    props.history.push('/');
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

  const[loading, setLoading] = React.useState(false)
  const submitHandler = e => {
    e.preventDefault();
    if (password.length === 0 || email.length ===0) {
      e.preventDefault();
      settingError();
    }

    else{
      setLoading(true)
      setTimeout(() => {
      const data =  props.onAuth(email, password);
      console.log("errr", data)
      setLoading(false)
      }, 2000);
      // props.history.push('index');
      e.preventDefault();
    }
  }

  const forgot_password_func = () =>{

    console.log("forgotpassclicked");
    setSentEmailBool(true)
    setSentEmail("We Have Sent an Email to your email id.Please follow the link to change your password..")
    axios.post('http://192.168.100.6:8000/api/password_reset/', {
      email: email
  })
  .then(res => {
      console.log("resssssssss", res)
      props.history.push('/');
  })
  .catch(err => {
      console.log(err)
  })
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

                  {/* <FormGroup> */}

                  <InputGroup
                    className={
                      "no-border" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons ui-1_email-85"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email..."
                      type="text"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    ></Input>
                  </InputGroup>

                    {/* <label htmlFor="exampleInputEmail1">Email address</label>
                    <Input
                      aria-describedby="emailHelp"
                      id="exampleInputEmail1"
                      placeholder="Enter email"
                      type="text"
                      
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email} onChange={e => setEmail(e.target.value)}

                    ></Input> */}

                    <InputGroup
                        className={
                          "no-border" + (lastFocus ? " input-group-focus" : "")
                        }>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password..."
                      type="password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    ></Input>
                  </InputGroup>
                  <label style={{color:'red',}} htmlFor="emptypasserror">{error}</label>


                   
                  {/* </FormGroup> */}
                  {/* <FormGroup>
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
                     <FormText className="text-muted" color="default" id="emailHelp">
                      We'll never share your email or password with anyone else.
                    </FormText>
                    <label style={{color:'red',}} htmlFor="emptypasserror">{error}</label>
                  </FormGroup>
      */}

                  </CardBody>

                  <CardFooter className="text-center">
                    {loading ?
                    <Spinner style={{ width: '2rem', height: '2rem' }} type="grow" color="primary" />
                       : 
                       <>

                    {sent_email_bool ?<h6>{sent_email}</h6>:<Link onClick={forgot_password_func}>Forgot Password or Username?</Link>}
                      
                      <Button block className="btn-round" color="info" size="md">Login</Button> 
                      <Button block className="btn-round btn-white" color="default" to="/signup" outline size="md" tag={Link}>
                        Don't Have an Account? Create one now...
                    </Button>
                    </>
                    }
                    
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
        {/* <TransparentFooter /> */}
      </div>
    </>
  );
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
