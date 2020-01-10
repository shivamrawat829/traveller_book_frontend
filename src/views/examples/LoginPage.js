import React from "react";
import {withRouter} from "react-router-dom";

// reactstrap components
import {Button,Card,CardHeader,CardBody,CardFooter,Form,Input,
  Container,Col,FormFeedback,FormGroup,FormText, Spinner
} from "reactstrap";
// import axios from "axios";
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

// core components
import ExamplesNavbar from "../../container/Navbars/ExamplesNavbar.js";
import TransparentFooter from "../../container/Footers/TransparentFooter.js";

const mapStateToProps = (state) => {
  // console.log("is authenticated", state.token)
  
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
  // const [leftFocus, setLeftFocus] = React.useState(false);
  // const [rightFocus, setRightFocus] = React.useState(false);

  const [firstFocus, setFirstFocus] = React.useState(false);
  // const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const[error, setError] = React.useState('')
 
  // const[setError] = React.useState('')

  const settingError = (event) =>{
    console.log("error", event)
    setError("password is incorrect");
  };

  React.useEffect(() => {
    console.log("LOdingggggggggggggggggggggg", props)

    if (props.isAuthenticated === true)
  {
    // console.log("yes it is")
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

  const[loading, setLoading] = React.useState(false)
  const submitHandler = e => {
    setLoading(true)
    // console.log("eeeeeeeeeeeeeeeeeeeeeeee", e, "ibfdijbfdskjbofb","email", email, "pasword", password)
    if (password.length < 5) {
      e.preventDefault();
      settingError();
      
    }

    else{
      e.preventDefault();
      
      console.log("loadinggg11111111111111", loading)
      setTimeout(() => {
        props.onAuth(email, password);
      }, 2000);
      // props.onAuth(email, password);
      // setLoading(false)
      // console.log("loadinggg2222222222", loading)
      // setLoading(false);
      // props.history.push('index');
      
    }
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

                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      // href="#pablo"
                      // onClick={e => e.preventDefault()}
                      // onClick={() => setFirstFocus(true)}
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
