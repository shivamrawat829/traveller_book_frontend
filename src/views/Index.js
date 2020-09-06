import React, {useState,useRef,  useEffect} from "react";
import Datetime from "react-datetime";

// reactstrap components
// import {
// } from "reactstrap";
import { connect } from 'react-redux';
// core components
import IndexNavbar from "../container/Navbars/IndexNavbar.js";
import IndexHeader from "../container/Headers/IndexHeader.js";
import Carousel from "./index-sections/Carousel.js";

import PostsTitle from "./index-sections/PostsTitle";
import axios from 'axios';
import {withRouter} from "react-router-dom";


import * as actions from '../store/actions/auth';



import { Badge, Button, Row, Col,ModalHeader,
   ModalBody,Label,
     UncontrolledTooltip, Modal, FormGroup, InputGroupText, Input, InputGroup
      , InputGroupAddon, CustomInput, Spinner, FormFeedback} from "reactstrap";


     const mapStateToProps = (state) => {
      console.log("is authenticated", state.token)
      return {
      loading: state.loading,
      error: state.error,
      isAuthenticated: state.token !== null,
      user_token : state.token
      }
    }
    
    const mapDispatchToProps = dispatch => {
      return {
      onAuth: (username, password) => dispatch(actions.authLogin(username, password)) ,
      logout: () => dispatch(actions.logout()) 
      }
    }
    

    
const useForceUpdate = () => useState()[1];

var id_global = 0

const _defaultPlace = [
  {
    place1: null,
    description1: null,
    place_pic: null,
    id:id_global
  },
];


function Index(props) {
  const [place_is, setPlacenew] = useState(_defaultPlace);
  const handlePlaceChange = event => {
    const _tempplace = [...place_is];
    _tempplace[event.target.dataset.id][event.target.name] = event.target.value;
    setPlacenew(_tempplace);
  };

  const handlePlaceImageChange = event => {
    const _tempimage = [...place_is];
    _tempimage[event.target.dataset.id][event.target.name] = event.target.files[0]
    setPlacenew(_tempimage);
  };

  const addNewPlace = () => {
    id_global = id_global + 1
    setPlacenew(prevPlace => [...prevPlace, { place1: "", description1: "", place_pic:[] ,id : id_global}]);
  };

  function handleRemove(i) {
    const values = [...place_is];
    values.splice(i, 1);
    setPlacenew(values);
  }

  const forceUpdate = useForceUpdate();
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [middleFocus, setmiddleFocus] = React.useState(false);
  const [middleFocusPlaces, setmiddleFocusPlaces] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [rating, setRating] = React.useState("");
  const [place, setPlace] = React.useState("");

  const [journey, setJourney] = React.useState("");
  const fileInput = useRef(null);

  const[error, setError] = React.useState('')
  const[journey_error, setJourneyError] = React.useState('')
  const[invalid_place, setInvalidPlace] = React.useState('')
  const[invalid_title, setInvalidTitle] = React.useState('')
  const[invalid_description, setInvalidDescription] = React.useState('')

  const[is_uploading, setIsUploading]=React.useState(false) 

  // const[setError] = React.useState('')
  const settingTitleError = (event) =>{
    // console.log("error", event)
    setError("Title Must not be Empty...");
    setInvalidTitle("Title Must not be Empty");
  };

  const {
    className
  } = props;
 
  const [modal, setModal] = useState(false);
  const [placeis, addPlace] = useState(false);
  const toggle = () => setModal(!modal);

  const submitHandler = e => {
    if (title.length === 0)
    {
      settingTitleError(e)
      setInvalidTitle("Title Must not be Empty");

    }
    else if (place.length === 0)
    {

      setInvalidPlace("Place Must not be Empty");

    }
    else if (description.length === 0)
    {

      setInvalidDescription("Description Must not be Empty");

    }

    else{
      let url = 'http://192.168.100.6:8000/api/posts/create/';
      let form_data = new FormData();
      setIsUploading(true)
      console.log("is uploading111111111111111111111", is_uploading);
      // console.log('placeeeeeeeeeee ',fileInput)
      // console.log('places are',place_is)
      // console.log('placeeeeeeeeeee22222 ',fileInput.current.files)
      if (fileInput.current.files.length > 0){
        form_data.append('image', fileInput.current.files[0], fileInput.current.files[0].place11111111);
      }
      
      form_data.append('title', title);
      form_data.append('description', description);
      form_data.append('place', place);
      form_data.append('rating', rating);
    
      console.log('form data',form_data)
          axios.post(url, form_data, {
            headers: {
            'content-type': 'multipart/form-data'
            }
          })
            .then(res => {
              console.log("SUCCESS", res);
                            if (res && place_is){
                              let url2 = 'http://192.168.100.6:8000/api/places/create/';
                              for (var i = 0; i<place_is.length;i++){
                                let form_data2 = new FormData();
                                // console.log('placeeeeeeeeeee ',fileInput)
                                // console.log('places are',place_is)
                                // // console.log('placeeeeeeeeeee22222 ',fileInput.current.files)
                                if (place_is[i].place_pic){
                                  // console.log('place_is[i].place_pic',place_is[i].place_pic)
                                  // console.log('place_is[i].place_pic.name',place_is[i].place_pic.name)
                                  form_data2.append('image', place_is[i].place_pic, place_is[i].place_pic.name);
                                }
                                
                                form_data2.append('place', place_is[i].place1);
                                form_data2.append('description', place_is[i].description1);
                                form_data2.append('post_id', res.data.id);
                                
                              axios.post(url2, form_data2, {
                                headers: {
                                // 'content-type': 'multipart/form-data'
                                }
                              })
                                .then(res2 => {
                                  console.log("SUCCESS2", res2);
                                  setIsUploading(false)
                                  console.log("is uploading2222222222222222", is_uploading);
                                })
                                .catch(err => console.log(err))
                              }
                            }
            })
            .catch(err => console.log(err))
    }
    e.preventDefault();
  }

  React.useEffect(() => {
    // console.log("propssssssssssssssssssssssindexxxxxxxxxxxxxxxxxx", props)
    
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

    
      <IndexNavbar {...props}/>
      <div className="wrapper">
        <IndexHeader is_uploading={is_uploading} />
        <div className="main">
          {/* <Images /> */}
          {/* <BasicElements /> */}
          {/* <Navbars /> */}
          {/* <Tabs /> */}
          
          {/* <Notifications /> */}
          {/* <Typography /> */}
          {/* <Javascript /> */}
          <Carousel />
          <PostsTitle {...props}/>
          {/* <NucleoIcons /> */}
          {/* <CompleteExamples /> */}
          {/* <SignUp /> */}
          {/* <Examples /> */}
          {/* <Pagination /> */}
          {/* <Download /> */}

        </div>

            {
            props.isAuthenticated ?

              <Button onClick={toggle}
                className=" btn-icon btn-round btn-raised" color="#ffffff" id="tooltip331904899" size="lg"
                style={{position:'fixed',bottom:'20px',right:'10px',zIndex:'99',}}>
                <i className="fa fa-plus"></i>
                <UncontrolledTooltip delay={0} target="tooltip331904899">
                Add Post
                </UncontrolledTooltip>
              </Button>
            :
            <></>
          }

       
              <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>Upload a Post...</ModalHeader>
                <ModalBody>
                <form onSubmit={submitHandler}> 


                      <Row>
                        <Col className="text-center ml-auto mr-auto" md="10" lg="10">

                        <InputGroup
                          className={
                            "input-md" + (firstFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon  addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons location_pin"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                          placeholder="Title For the Post..." type="text" onFocus={() => setFirstFocus(true)}
                            onBlur={() => setFirstFocus(false)} value={title} onChange={e => setTitle(e.target.value)}
                          >
                          </Input>
                        {/* <FormFeedback>danger{invalid_title}</FormFeedback> */}
                      
                          
                        </InputGroup>
                        <h6 style={{color:'red',}}>{error}</h6>
                        <InputGroup className={"input-md"}>
                    {/* <Label for="exampleCustomFileBrowser">File Browser with Custom Label</Label> */}
                    {/* <CustomInput  type="file"  ref={fileInput} onChange={forceUpdate}  label="Choose Cover Pic...!" /> */}
                    <input type="file" ref={fileInput} className={"form-control"} onChange={forceUpdate}/> 
                    
                  </InputGroup>

                        <br/>
                        <InputGroup
                          className={
                            "input-md" + (middleFocus ? " input-group-focus" : "")
                          }
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="now-ui-icons location_pin"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                            <Input
                              placeholder="Place..." type="text" 
                              onFocus={() => setmiddleFocus(true)}
                              onBlur={() => setmiddleFocus(false)} 
                              value={place} 
                              onChange={e => setPlace(e.target.value)}
                            >
                            </Input>
                            <FormFeedback>{invalid_place}</FormFeedback>
                          </InputGroup>
                          

                          <Label for="exampleSelect">Rating</Label>
                            <Input className='input-md' value={rating} onChange={e => setRating(e.target.value)} 
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
                            <FormFeedback>{invalid_description}</FormFeedback>
                          </div>       
                            {/* <FormGroup className='input-md'>
                              <Datetime
                                timeFormat={false}
                                inputProps={{ placeholder: "Journey Date" }}
                                value={journey} 
                              onChange={e => setJourney(e.target.value)}

                              />
                            </FormGroup> */}
                              <h6>{journey_error}</h6>
                              <a   href='#'>
                              <Badge onClick={addNewPlace} color="info" className="mr-1">
                                  Add Place
                                </Badge>
                                </a>

                              {place_is.map((item, id) => {

                                      // console.log('item',item)
                                      // console.log('idddddd',item.id)
                                      return (
                                        <div key={item.id}>
                                         

                                          {/* <input type="file" ref={fileInput} onChange={forceUpdate}/> */}
                                              <br/>
                                              <InputGroup
                                                className={
                                                  "input-md" + (middleFocusPlaces ? " input-group-focus" : "")
                                                }
                                              >
                                                <InputGroupAddon addonType="prepend">
                                                  <InputGroupText>
                                                    <i className="now-ui-icons location_pin"></i>
                                                  </InputGroupText>
                                                </InputGroupAddon>
                                                  <Input
                                                    placeholder="Place..." type="text" 
                                                    data-id={item.id}
                                                    defaultValue ={item.place1}
                                                    onChange={handlePlaceChange}
                                                    name="place1"
                                                    onFocus={() => setmiddleFocusPlaces(true)}
                                                    onBlur={() => setmiddleFocusPlaces(false)} 
                                                    // onChange={e => handleChange(idx, e)}
                                                  >
                                                  </Input>
                                                </InputGroup>


                                                <InputGroup
                                                  className={
                                                    "input-md" + (lastFocus ? " input-group-focus" : "")
                                                  }
                                                >
                                                  <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                      <i className="now-ui-icons files_paper"></i>
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                      data-id={item.id}
                                                      placeholder="Description..."
                                                      defaultValue={item.description1}
                                                      onChange={handlePlaceChange}
                                                      name="description1"
                                                    >
                                                    </Input>
                                                </InputGroup>

                                                {/* <InputGroup> */}

                                            
                                                <InputGroup className={"input-md"}>
              
                                                  <input type="file" name="place_pic" label="Choose Picture of the Place...!"  data-id={item.id} className={"form-control"} onChange={handlePlaceImageChange}/> 
                                                  
                                                </InputGroup>



                                              {/* <CustomInput onChange={handlePlaceImageChange} data-id={index}
                                               name="place_pic"  type="file" 
                                                label="Choose Picture of the Place...!" /> */}
                                            {/* </InputGroup> */}

                                               
                                                <Button onClick={() => handleRemove(item.id)} color="danger">Remove</Button>
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
            

      </div>
    </>
  );
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index));