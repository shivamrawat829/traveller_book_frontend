import React, {useState,useRef,  useEffect} from "react";
import Datetime from "react-datetime";

// reactstrap components
// import {
// } from "reactstrap";

// core components
import IndexNavbar from "../container/Navbars/IndexNavbar.js";
import IndexHeader from "../container/Headers/IndexHeader.js";
import DarkFooter from "../container/Footers/DarkFooter.js";

// sections for this page
// import Images from "./index-sections/Images.js";
// import BasicElements from "./index-sections/BasicElements.js";
// import Navbars from "./index-sections/Navbars.js";
// import Tabs from "./index-sections/Tabs.js";
// import Pagination from "./index-sections/Pagination.js";
// import Notifications from "./index-sections/Notifications.js";
// import Typography from "./index-sections/Typography.js";
// import Javascript from "./index-sections/Javascript.js";
import Carousel from "./index-sections/Carousel.js";
// import NucleoIcons from "./index-sections/NucleoIcons.js";
// import CompleteExamples from "./index-sections/CompleteExamples.js";
// import SignUp from "./index-sections/SignUp.js";
// import Examples from "./index-sections/Examples.js";
import Download from "./index-sections/Download.js";
import PostsTitle from "./index-sections/PostsTitle";
import axios from 'axios';
import {withRouter} from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';



import { Badge, Button, Row, Col,ModalHeader,
   ModalBody,Label,
     UncontrolledTooltip, Modal, FormGroup, InputGroupText, Input, InputGroup
      , InputGroupAddon} from "reactstrap";


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
    

    
const useForceUpdate = () => useState()[1];

const _defaultPlace = [
  {
    place1: "",
    description1: ""
  },
];


function Index(props) {

  const forceUpdate = useForceUpdate();

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [middleFocus, setmiddleFocus] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [place, setPlace] = React.useState("");

  const [journey, setJourney] = React.useState("");
  const fileInput = useRef(null);

  const[error, setError] = React.useState('')
  const[journey_error, setJourneyError] = React.useState('')
  // const[setError] = React.useState('')


  const settingTitleError = (event) =>{
    console.log("error", event)
    setError("Title Must not be Empty...");
  };



  const setJourneyErrorM = (event) =>{
    console.log("error", event)
    setJourneyError("Journey Date Required...");
  };



  const {
    buttonLabel,
    className
  } = props;

 
  const [modal, setModal] = useState(false);
  const [placeis, addPlace] = useState(false);

  const toggle = () => setModal(!modal);

  const submitHandler = e => {




    if (title.length === 0)
    {
      console.log("eeeeeeeeeeeeeeeeeeeeeeee", e)
      settingTitleError();

    }
    if (journey.length === 0)
    {

      setJourneyErrorM();

    }
    else{
      let url = 'http://127.0.0.1:8000/api/create/';
      console.log("eeeeeeeeeeeeeeeeeeeeeeee", e, "ibfdijbfdskjbofb", title,"image",  fileInput.current.files[0] , "des",description, 
      "place",place,"rating", rating)
      let form_data = new FormData();
      form_data.append('image', fileInput.current.files[0], fileInput.current.files[0].name);
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
    }

 
    e.preventDefault();
  }

  const [place_is, setPlacenew] = useState(_defaultPlace);

  const handlePlaceChange = event => {
    const _tempplace = [...place_is];
    _tempplace[event.target.dataset.id][event.target.name] = event.target.value;

    setPlacenew(_tempplace);

    console.log("rgfdgdfg", _tempplace)
  };

  const addNewPlace = () => {
    setPlacenew(prevPlace => [...prevPlace, { place1: "", description1: "" }]);
  };

  // const getTotalCosts = () => {
  //   return place_is.reduce((total, item) => {
  //     return total + Number(item.price);
  //   }, 0);
  // };

  function handleRemove(i) {
    const values = [...place_is];
    values.splice(i, 1);
    setPlacenew(values);
  }



  


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
  return (
    <>

    
      <IndexNavbar />
      <div className="wrapper">
        <IndexHeader />
        <div className="main">
          {/* <Images /> */}
          {/* <BasicElements /> */}
          {/* <Navbars /> */}
          {/* <Tabs /> */}
          
          {/* <Notifications /> */}
          {/* <Typography /> */}
          {/* <Javascript /> */}
          <Carousel />
          <PostsTitle/>
          {/* <NucleoIcons /> */}
          {/* <CompleteExamples /> */}
          {/* <SignUp /> */}
          {/* <Examples /> */}
          {/* <Pagination /> */}
          <Download />

        </div>

            {
            props.isAuthenticated ?

              <Button onClick={toggle}
                className=" btn-icon btn-round btn-raised" color="#ffffff" id="tooltip331904899" size="lg"
                style={{position:'fixed',bottom:'20px',right:'10px',zIndex:'99',}}>
                <i className="fab fa-plus"></i>
                <UncontrolledTooltip delay={0} target="tooltip331904899">
                Add Post
                </UncontrolledTooltip>
              </Button>
            :
            <></>
          }

        {/* <Button onClick={toggle}
                className=" btn-icon btn-round btn-raised"
                color="#ffffff"
                // href="add-posts"We're going to launch Now UI Kit PRO React. It will have huge number of components, sections and example pages so you can start your development with a badass Bootstrap 4 UI Kit.

                id="tooltip331904899"
                size="lg"
                target="_blank"
                style={{
                 position:'fixed',
                 bottom:'20px',
                 right:'10px',
                 zIndex:'99',
                 }}

              >
                <i className="fab fa-plus"></i>
              </Button> */}
             

              <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Upload a Post...</ModalHeader>
                <ModalBody>
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
                          placeholder="Title For the Post..." type="text" onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)} value={title} onChange={e => setTitle(e.target.value)}
                          >
                          </Input>
                        
                          
                        </InputGroup>
                        <h6 style={{color:'red',}}>{error}</h6>

                        {/* <Popover
                          placement="left"
                          // isOpen={this.state.popover1}
                          // target="popover1"
                          className="popover-primary"
                        ></Popover> */}
                        
                        {/* <Popover
                          placement="left"
                          isOpen={true}
                          target="popover1"
                          className="popover-primary"
                        >
                          <PopoverHeader>Popover On left</PopoverHeader>
                          <PopoverBody>
                            And here's some amazing content. It's very engaging. Right?
                          </PopoverBody>
                        </Popover> */}

                        

                        <input type="file" ref={fileInput} onChange={forceUpdate}/>
                        <br/>
                        <InputGroup
                          className={
                            "input-lg" + (middleFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons location_pin"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                            <Input
                              placeholder="Place..." type="text" onFocus={() => setmiddleFocus(true)}
                              onBlur={() => setmiddleFocus(false)} 
                              value={place} 
                              onChange={e => setPlace(e.target.value)}
                            >
                            </Input>
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
                                placeholder="Description..." type="text" onFocus={() => setLastFocus(true)} onBlur={() => setLastFocus(false)}
                                
                              >
                              </Input>
                          </InputGroup>

                          <Label for="exampleSelect">Rating</Label>
                            <Input className='input-lg' value={rating} onChange={e => setRating(e.target.value)} 
                            type="number" name="select" id="exampleSelect">
                              {/* <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option> */}
                            </Input>


                          <div className="textarea-container">
                            <Input cols="80" name="description" placeholder="Description..." rows="4" type="textarea"
                              value={description} onChange={e => setDescription(e.target.value)}
                            ></Input>
                          </div>       
                            <FormGroup className='input-lg'>
                              <Datetime
                                timeFormat={false}
                                inputProps={{ placeholder: "Journey Date" }}
                                value={journey} 
                              onChange={e => setJourney(e.target.value)}

                              />
                            </FormGroup>
                              <h6>{journey_error}</h6>


                              {/* <i id='add_place' 
                              className="now-ui-icons ui-1_simple-add"
                              onClick={e => {
                                e.preventDefault();
                                addPlace(!placeis);
                              }}
                              ></i> */}

                            {/* <i id='add_place2' 
                              className="now-ui-icons ui-1_simple-add"
                              onClick={() => handleAdd()}
                              ></i> */}
                              <a id='add_place'  href='#'>
                              <Badge onClick={addNewPlace} color="info" className="mr-1">
                                  Add Place
                                </Badge>
                                </a>
                                <UncontrolledTooltip target="#add_place">
                              Add Place
                            </UncontrolledTooltip>

                              {place_is.map((item, index) => {
                                      return (
                                        <div key={index}>
                                         

                                          {/* <input type="file" ref={fileInput} onChange={forceUpdate}/> */}
                                              <br/>
                                              <InputGroup
                                                className="input-lg"
                                              >
                                                <InputGroupAddon addonType="prepend">
                                                  <InputGroupText>
                                                    <i className="now-ui-icons location_pin"></i>
                                                  </InputGroupText>
                                                </InputGroupAddon>
                                                  <Input
                                                    placeholder="Place..." type="text" 
                                                    // onFocus={() => setmiddleFocus(true)}
                                                    // onBlur={() => setmiddleFocus(false)} 
                                                    // value={fields.value}
                                                    data-id={index}
                                  
                                                    value={item.place1}
                                                    onChange={handlePlaceChange}
                                                    // onChange={e => handleChange(idx, e)}
                                                  >
                                                  </Input>
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
                                                      data-id={index}
                                  
                                                      value={item.description1}
                                                      onChange={handlePlaceChange}
                                                      
                                                    >
                                                    </Input>
                                                </InputGroup>

                                               
                                                <Button onClick={() => handleRemove(index)} color="danger">Remove</Button>



                                        </div>
                                      );
                                    })}
                                    


                            

                            { placeis ?
                            <h1 className='f'>THIS ONLY SHOW ON TRUE</h1>
                              :
                              <br/>
                            }


                            

                 
                            <div className="send-button">
                              <Button id='popover1' block className="btn-round" color="info" size="lg">Submit</Button>
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
        <DarkFooter />
      </div>
    </>
  );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));