import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import demo from '../index-sections/demosignin';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Spinner
} from "reactstrap";

// authentication related
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

// core components
const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2)) 
  }
}

function SignUp(props) {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");

  const [do_not_match_error, setPasswordDoNotMatch] = React.useState(false);
  const [min_len_error, setMinimumLengthError] = React.useState(false);
  const[loading, setLoading] = React.useState(false)


  const googlesignin = async (e) => {
     
    console.log("googlesignin ENDD....", e)
  };

  // useEffect(()  => {
  //   console.log("passseodf....", do_not_match_error)
  //   setPasswordDoNotMatch(false)
   
    
  // }, [setPasswordDoNotMatch]);

   const submitHandler = e => {
    // e.preventDefault();

    if (password != confirm_password){
      setPasswordDoNotMatch(true)
    }

    else if(password.length < 8 ){
      setMinimumLengthError(true)
    }

    else{
      setLoading(true)
      setPasswordDoNotMatch(false)
  
      console.log("signupppppppppppppppppppp", username, email, password, confirm_password)
      setTimeout(() => {
        const data =  props.onAuth(username,email, password, confirm_password);
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa11111a", data, props)
        setLoading(false)
        }, 2000);
      }
        e.preventDefault();
    
  }
  

  return (
    <>
      <div
        className="section section-signup"
        style={{
          backgroundImage: "url(" + require("../../assets/img/bg11.jpg") + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          minHeight: "500px"
        }}
      >
        <Container>
          <Row>
            <Card className="card-signup" data-background-color="blue">
              <Form onSubmit={submitHandler} action="" className="form" method="">
                <CardHeader className="text-center">
                  <CardTitle className="title-up" tag="h3">
                    Sign Up
                  </CardTitle>
                  <div className="social-line">
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="facebook"
                      href="#"
                      size="lg"
                      onClick={e => e.preventDefault()}
                    >
                      <i className="fab fa-facebook-square"></i>
                    </Button>
                    {/* <Button
                      className="btn-neutral btn-icon btn-round"
                      color="twitter"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="lg"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button> */}
                    <Button
                      className="btn-neutral btn-icon btn-round"
                      color="google"
                      href="#"
                      size="lg"
                      // onClick={() => demo.googleSDK()}
                      ref={demo.googleLoginBtn}
                    >
                      <i className="fab fa-google-plus"></i>
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <InputGroup
                    className={
                      "no-border" + (firstFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons users_circle-08"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Name..."
                      type="text"
                      onFocus={() => setFirstFocus(true)}
                      onBlur={() => setFirstFocus(false)}
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    ></Input>
                  </InputGroup>
            
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
                      type="email"
                      onFocus={() => setEmailFocus(true)}
                      onBlur={() => setEmailFocus(false)}
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    ></Input>
                  </InputGroup>

                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
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

                  <InputGroup
                    className={
                      "no-border" + (lastFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="now-ui-icons text_caps-small"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Confirm Password..."
                      type="confirm_password"
                      onFocus={() => setLastFocus(true)}
                      onBlur={() => setLastFocus(false)}
                      value={confirm_password}
                      onChange={e => setConfirmPassword(e.target.value)}
                    ></Input>
                  </InputGroup>
                  {min_len_error ? <label>Password Must be 8 or more Character's Long...</label> : <></>}

                  {do_not_match_error ? <label>Password Does not Match...</label> : <></>}

                </CardBody>
                <CardFooter className="text-center">

                      {
                        loading ?  <Spinner color="primary" /> :
                        <Button
                            className="btn-neutral btn-round"
                            color="info"
                            size="lg">
                            Get Started
                      </Button>

                      }
              
                </CardFooter>
              </Form>
            </Card>
          </Row>
      

          <div className="col text-center">
          {
              loading ?  <></> : 
              <Button
              className="btn-round btn-white"
              color="default"
              to="/login"
              outline
              size="lg"
              tag={Link}
            >
              Already Have an Account? Login Now...
            </Button>
          }
            
          </div>
        </Container>
      </div>
    </>
  );
}



export default connect(mapStateToProps, mapDispatchToProps)(SignUp);


