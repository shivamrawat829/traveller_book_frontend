import React, {useState, useEffect} from "react";
import Datetime from "react-datetime";

import { Button, Container, Row, Col,ModalHeader,
   ModalBody, ModalFooter,
     UncontrolledTooltip, Modal, FormGroup, InputGroupText, Input, InputGroup , InputGroupAddon} from "reactstrap";

function UploadPosts(props) {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const {
        buttonLabel,
        className
      } = props;

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  // const [data, handleFormSubmit] = React.useState([]);
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {

    
    document.body.classList.add("index-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("index-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  const submitHandler = e => {

    console.log("ibfdijbfdskjbofb", e)
    // e.preventDefault();


  }

  
  return (
    <>
   
 
            
             
              
              <form onSubmit={submitHandler}>
               
                   
                      
                      <Row>
                        <Col className="text-center ml-auto mr-auto" md="10" lg="10">

                        <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons location_pin"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Title For the Post..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                    value={title}
                    onChange={e => setTitle(e.target.value)}

                  ></Input>
                </InputGroup>

                <input type="file" />


                        <InputGroup
                  className={
                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons location_pin"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Place..."
                    type="text"
                    onFocus={() => setFirstFocus(true)}
                    onBlur={() => setFirstFocus(false)}
                  ></Input>
                </InputGroup>
                <InputGroup
                  className={
                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                  }
                >
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="now-ui-icons files_paper"></i>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Description..."
                    type="text"
                    onFocus={() => setLastFocus(true)}
                    onBlur={() => setLastFocus(false)}
                  ></Input>
                </InputGroup>
                <div className="textarea-container">
                  <Input
                    cols="80"
                    name="description"
                    placeholder="Description..."
                    rows="4"
                    type="textarea"
                  ></Input>
                </div>

         
                          
                            <FormGroup className='input-lg'>
                              <Datetime
                                timeFormat={false}
                                inputProps={{ placeholder: "Journey Date" }}
                              />
                            </FormGroup>
                 
                

                <div className="send-button">
                  <Button
                    block
                    className="btn-round"
                    color="info"
                    href="#pablo"
                    // onClick={handleFormSubmit}
                    size="lg"
                  >
                    Submit
                  </Button>
                </div>

              </Col>
                      </Row>
                     
              
                </form>   
                

      

   
    </>
  );
}

export default UploadPosts;
