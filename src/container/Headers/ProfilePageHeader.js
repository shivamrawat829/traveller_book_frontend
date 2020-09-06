import React, {useState, useRef} from "react";

// reactstrap components

import {Container, Button, Row, Col,ModalHeader,
  ModalBody, Modal, InputGroupText, Input, InputGroup
     , InputGroupAddon} from "reactstrap";

import axios from 'axios';

// core components

function ProfilePageHeader(props) {
  let pageHeader = React.createRef();
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [middleFocus, setmiddleFocus] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [user_name, setUsername] = React.useState("");
  const [first_name, setFirstName] = React.useState("");
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
      let url = `http://192.168.100.6:8000/retrieve-profile/${localStorage.user_id}/`
      console.log("props waleeeeeeeeeeeeeeee", props)
      console.log("eeeeeeeeeeeeeeeeeeeeeeee",email, user_name, first_name, description)
      let form_data = new FormData();
      // console.log('placeeeeeeeeeee ',place_is, fileInput)
      // form_data.append('image', fileInput.current.files[0], fileInput.current.files[0].name);
      // form_data.append('email', email);
      if (user_name){
        form_data.append('username', user_name);
      }
      else{
        form_data.append('username', props.username);
      }
      form_data.append('first_name', first_name);
      
      if (description)
      {
        form_data.append('user_profile.about_me', description);
      }
      else{
        form_data.append('user_profile.about_me', props.about_user);
      }
      
      if (email){
        form_data.append('email', email);
      }
      
    
      // axios.put(url, {
      //   'first_name':first_name
      // })
      // .then(res => console.log(res))
      // .catch(err=>console.log(err))
          axios.patch(url, form_data, {
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
    // console.log("PROFILE PAGE HEADER ", props)

    if (window.innerWidth > 1000) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        console.log("page heaaderrrrrrrrr", pageHeader)
        if (pageHeader.current !== null)
        {
          pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
        }
        
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
            backgroundImage: `url(${props.cover_pic})`,
          }}
          ref={pageHeader}
        ></div>
        <Container>
          <div className="photo-container">
            <img alt="..." src={props.user_image}></img>
          </div>
        <h3 className="title">{props.first_name}</h3>

        {props.my_profile ? <Button className="btn-round mr-1" color="info" role="button" size="md" onClick={toggle}>
        Edit Profile
        </Button> :
        <></>}
        
        <p className="category">{props.username}</p>
        {props.my_profile? <p className="email">{props.email}</p> : <></>}
        
          <div className="content">
            <div className="social-description">
              <h2>26</h2>
              <p>Followers</p>
            </div>
            <div className="social-description">
              <h2>{props.total_posts}</h2>
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
                          <img alt="..." src={props.user_image}></img>
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
                            onBlur={() => setFirstFocus(false)} 
                            defaultValue={props.first_name}
                          onChange={e => setFirstName(e.target.value)}
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
                              defaultValue={props.username} 
                              onChange={e => setUsername(e.target.value)}
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
                      defaultValue={props.email}
                      onChange={e => setEmail(e.target.value)}
                    ></Input>
                  </InputGroup>

                          <div className="textarea-container">
                            <Input cols="80" name="description" placeholder="About me..." rows="4" type="textarea"
                              defaultValue={props.about_user} onChange={e => setDescription(e.target.value)}
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
