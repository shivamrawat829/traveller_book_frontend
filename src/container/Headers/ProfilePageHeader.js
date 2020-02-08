import React, {useState, useRef} from "react";

// reactstrap components

import {Container, Button, Row, Col,ModalHeader,
  ModalBody, Modal, InputGroupText, Input, InputGroup
     , InputGroupAddon} from "reactstrap";

import axios from 'axios';

// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();

 

  const[noOfPosts, setnoOfPosts] = useState(0)
  const [email, setEmail] = React.useState("");


  const [firstFocus, setFirstFocus] = React.useState(false);
  const [middleFocus, setmiddleFocus] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [place, setPlace] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState(false);
  const {
    className
  } = props;
 
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
 
  const useForceUpdate = () => useState()[1];
  const forceUpdate = useForceUpdate();
  const fileInput = useRef(null);

  const submitHandler = e => {
   console.log("submit handler chalaaaaa")
      let url = 'http://127.0.0.1:8000/api/create/';
      // console.log("eeeeeeeeeeeeeeeeeeeeeeee", e, "ibfdijbfdskjbofb", title,"image",  fileInput.current.files[0] , "des",description, 
      // "place",place,"rating", rating)
      e.preventDefault();
      let form_data = new FormData();
      // console.log('placeeeeeeeeeee ',place_is, fileInput)
      // form_data.append('image', fileInput.current.files[0], fileInput.current.files[0].name);
      form_data.append('title', title);
      form_data.append('description', description);
      form_data.append('place', place);
      form_data.append('rating', rating);
    
          axios.post(url, form_data, {
            headers: {
            'content-type': 'multipart/form-data'
            }
          })
            .then(res => {
              console.log("SUCCESS", res);
            })
            .catch(err => console.log(err))
    


    e.preventDefault();
  }


  



  React.useEffect(() => {

    

    // console.log("this time", props.location.search, "and", props.location.hash)
    const fetchUserData = async () => {
      // console.log("userssssssssssssss.ijbfdsijbfbs..",props)
      setnoOfPosts(152)
    };

    fetchUserData();

    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div
        className="page-header clear-filter page-header-small"
        filter-color="blue"
      >
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("../../assets/img/bg5.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={require("../../assets/img/julie.jpg")}></img>
          </div>
        <h3 className="title">{props.username}</h3>
        <Button className="btn-round mr-1" color="info" role="button" size="md" onClick={toggle}>
        Edit Profile
        </Button> 
        

            
        <p className="category">Air Force Personal</p>
        <p className="email">{props.email}</p>
          <div className="content">
            <div className="social-description">
              <h2>26</h2>
              <p>Followers</p>
            </div>
            <div className="social-description">
              <h2>{noOfPosts}</h2>
              <p>Posts</p>
            </div>
            <div className="social-description">
              <h2>1552</h2>
              <p>Likes</p>
            </div>
          </div>

          

          <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Edit Profile...</ModalHeader>
                <ModalBody>
                <form onSubmit={submitHandler}> 


                      <Row>
                        <Col className="text-center ml-auto mr-auto" md="10" lg="10">

                        <div className="photo-container">
                          <img alt="..." src={require("../../assets/img/julie.jpg")}></img>
                        </div>
                        <br/>
                        <br/>

                        <InputGroup
                          className={
                            "input-md" + (firstFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="now-ui-icons location_pin"></i> */}
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input 
                          placeholder="Name..." type="text" onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)} value={title} onChange={e => setTitle(e.target.value)}
                          >
                          </Input>
                        
                          
                        </InputGroup>
                        {/* <InputGroup> */}
                    {/* <Label for="exampleCustomFileBrowser">File Browser with Custom Label</Label> */}
                    {/* <CustomInput  type="file"  ref={fileInput} onChange={forceUpdate}  label="Choose Cover Pic...!" /> */}
                    {/* <Button  type="file" ref={fileInput} onChange={forceUpdate}  label="Choose Cover Pic...!" /> */}
                    {/* <input type="file" ref={fileInput} onChange={forceUpdate}/>  */}
                  {/* </InputGroup> */}

                        
                        <InputGroup
                          className={
                            "input-md" + (middleFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              {/* <i className="now-ui-icons location_pin"></i> */}
                            </InputGroupText>
                          </InputGroupAddon>
                            <Input
                              placeholder="Username..." type="text" onFocus={() => setmiddleFocus(true)}
                              onBlur={() => setmiddleFocus(false)} 
                              value={place} 
                              onChange={e => setPlace(e.target.value)}
                            >
                            </Input>
                          </InputGroup>

                          <InputGroup
                    className={
                      "input-md" + (emailFocus ? " input-group-focus" : "")
                    }
                  >
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        {/* <i className="now-ui-icons ui-1_email-85"></i> */}
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

                          <div className="textarea-container">
                            <Input cols="80" name="description" placeholder="About me..." rows="4" type="textarea"
                              value={description} onChange={e => setDescription(e.target.value)}
                            ></Input>
                          </div>       
                  
                            <div className="send-button">
                              <Button id='popover1' block className="btn-round" color="info" size="lg">Update Profile</Button>
                            </div>
                        </Col>
                      </Row>
                  </form>
                </ModalBody>
                {/* <ModalFooter>
                  <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter> */}
            </Modal>




        </Container>
      </div>
    </>
  );
}

export default ProfilePageHeader;
