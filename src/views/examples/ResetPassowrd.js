import React ,{useEffect, useState} from "react";
// reactstrap components
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import axios from 'axios';

// core components

function ResetPassword(props){
    const[pass_not_same, setPassNotSame] = useState(false);
    const[password, setPassword] = useState("");
    const[confirm_password, setConfirmPassword] = useState("");
    const[pass_len_err, setPassLenErr] = useState("") 

    useEffect(() => {

        if (password !== confirm_password){
            setPassNotSame(true)
          }
          else {
            setPassNotSame(false) 
          }
          if (password.length < 8)
          {
            setPassLenErr("Password Must be 8 Character Long...") 
          }
          else{
            setPassLenErr("")
          }
      });

      const submitHandler = e => {
          if (password.length < 8)
          {
            setPassLenErr("Password Must be 8 Character Long...")
          }
          else if (password === confirm_password){
            console.log("change password ", props)
            const parts = props.location.search.split('=', 2);
            const token  = parts[1];
            console.log("the num", token)
    
              axios.post('http://192.168.100.6:8000/api/password_reset/confirm/', {
                token: token,
                password: password,
            })
            .then(res => {
                console.log("resssssssss", res)
                props.history.push('/');
            })
            .catch(err => {
                console.log(err)
            })


          }
         
        
        e.preventDefault();
       
      }



  return (
    <>
      <Form className="form-inline" onSubmit={submitHandler} action=""  method="POST">
        <FormGroup>
          <label className="sr-only" htmlFor="staticEmail2">
            Email
          </label>
          <input
            className="form-control-plaintext"
            defaultValue="email@example.com"
            id="staticEmail2"
            readonly=""
            type="text"
          ></input>
        </FormGroup>
        
        
        <FormGroup className="mx-sm-3">
          <label className="sr-only" htmlFor="inputPassword2">
            Password
          </label>
          <Input
            id="inputPassword2"
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Input>
        </FormGroup>

        <FormGroup className="mx-sm-3">
          <label className="sr-only" htmlFor="inputPassword3">
            Password
          </label>
          <Input
            id="inputPassword3"
            placeholder="Confirm Password"
            type="password"
            value={confirm_password}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Input>
        </FormGroup>

        <Button color="primary" type="submit">
          Change Password
        </Button>
        {pass_not_same ? <h6>Password's do not Match...</h6>: <></>}
            <h6>{pass_len_err}</h6>
      </Form>
    </>
  );
}

export default ResetPassword;