import React from 'react';
import './AdventureDetail.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import {withRouter, NavLink} from "react-router-dom";
// import Map from '../Map';



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

class AdventureDetail extends React.Component{
// const AdventureDetail = (props) =>{
    // console.log("propsssssssss", props);

    state={
      posts:{}
    }

    componentDidMount()
    {
      console.log("POST ID", this.props)
      const postID = this.props.location.state.data;

      

      axios.get(`http://127.0.0.1:8000/api/posts/${postID}`)
      .then(res => {
        this.setState({
            posts: res.data
        });

        console.log("thiissssssssss ID", this.state.posts)
      })

      console.log("this state posts", this.state.posts)
    }


    delete_post = (event)=> {
      const postID = this.props.location.state.data.alldata.id;
      axios.delete(`http://127.0.0.1:8000/api/posts/${postID}/delete/`);
        console.log("thiissssssssss ID", this.state.posts)
        this.props.history.push("/")
      }
    

    render(){
    return(

    <div className="App">

<header className="header menu_fixed">
		{/* <div id="preloader"><div data-loader="circle-side"></div></div> */}
		{/* <div id="logo">
			<a href="index.html"> */}
				{/* logos */}
				{/* <img src="img/logo.png" width="150" height="36" data-retina="true" alt="" className="logo_normal"/> */}
				{/* <img src="img/logo_sticky.png" width="150" height="36" data-retina="true" alt="" className="logo_sticky"/> */}
			{/* </a>
		</div> */}

		
		<a href="#menu" className="btn_mobile">
			<div className="hamburger hamburger--spin" id="hamburger">
				<div className="hamburger-box">
					<div className="hamburger-inner"></div>
				</div>
			</div>
		</a>
		<nav id="menu" className="main-menu">
			<ul>
				<li ><span><NavLink to='/' >Home</NavLink></span>
					<ul>
						<li><a href="index.html">Home version 1</a></li>
						<li><a href="index-2.html">Home version 2</a></li>
					</ul>
				</li>
				{
                    this.props.isAuthenticated ?
    
					<li onClick={this.props.logout} ><span><a href="#0">Logout</a></span>
					</li>
    
                    :
    
					<li data-toggle="modal" data-target="#myModal"><span><a href="#0">Login/Signup</a></span>
					</li>	
                }

{
                    this.props.isAuthenticated ?
    
					<li data-toggle="modal" data-target="#post_dialog"><span><a href="#0">Post</a></span>
				</li>	
    
                    :
    
					<li >
					</li>	
                }
        <li data-toggle="modal" data-target="#post_dialog"><button onClick={this.delete_post} type="button" className="btn btn-danger">Delete Post</button>
				</li>			
			</ul>
		</nav>
	</header>



<main>
  <section className="header-video adventure">
			<div id="hero_video">
				<div className="wrapper">
					<div className="container container-custom">
						<small>Introducing</small>
						<h3>Traveller Book</h3>
						<p>Hosted journeys to extraordinary and unique places.</p>
						<a href="adventure-detail.html" className="btn_1">Read more</a>
					</div>
				</div>
			</div>
      <img src={require('../../images/background.png')} alt="" className="header-video--media" data-video-src="video/adventure" data-teaser-source="video/adventure" data-provider="" data-video-width="1920" data-video-height="960" />
      
		
	</section>

  
{/* 
	<Map
     google={props.google}
     center={{lat: 18.5204, lng: 73.8567}}
     height='300px'
     zoom={15}
    /> */}

	<div className="row">
  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 margin">
  <img alt='' src={require( '../../images/background.png')} className='card-img-top' />
  </div>
  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 margin" style={{margin: "auto"}}>
  <div className="card border-primary mb-3">
    <div className="card-body">
      <h4 className="card-title">Card title</h4>
      <p className="card-text">Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text.</p>
      <a href="www.google.com" className="card-link">Card link</a>
      <a href="www.google.com" className="card-link">Another link</a>
    </div>
  </div>
  
  </div>
</div>

<div className="row">

<div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 margin" style={{margin: "auto"}}>
  <div className="card border-primary">
    <div className="card-body">
      <h4 className="card-title">Card title</h4>
      <p className="card-text">Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text.</p>
      <a href="www.google.com" className="card-link">Card link</a>
      <a href="www.google.com" className="card-link">Another link</a>
    </div>
  </div>
  
  </div>

  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 margin">
  <img src={require( '../../images/adventure.jpg')} alt='' className='card-img-top' />
  </div>
 
</div>

<div className="row">
  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 margin" >
  <img src={require( '../../images/background2.png')} alt='' className='card-img-top' />
  </div>
  <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 margin" style={{margin: "auto"}}>
  <div className="card border-primary">
    <div className="card-body">
      <h4 className="card-title">Card title</h4>
      <p className="card-text">Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text Some example text. Some example text Some example text. Some example text Some example text. Some example text
      Some example text. Some example text.</p>
      <a href="www.google.com" className="card-link">Card link</a>
      <a href="www.google.com" className="card-link">Another link</a>
    </div>
  </div>
  
  </div>
</div>


<div className="row">
  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12" >
  <h6 className='col-md-6 control-label'>Like this post</h6>

    <i className="fa fa-thumbs-up fa-3x control-label" aria-hidden="true" style={{color: "cadetblue"}}></i>
  </div>
</div>


{/* <!-- Textarea --> */}
<div className="form-group">

  
  <h6 className='col-md-6 control-label'>THIS IS A COMMENT</h6>
  <label className="col-md-6 control-label" htmlFor="textarea">Add a comment</label>
  <div className="col-md-6">                     
    <textarea className="form-control" id="textarea" name="textarea"></textarea>
  </div>
</div>


{/* <!--Google map--> */}
{/* <div id="map-container-google-1" className="z-depth-1-half map-container" style={{height: '500px'}}>
  <iframe src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0"
    style={{border: "0"}} allowfullscreen></iframe>
</div> */}

{/* <!--Google Maps--> */}










<div className="col-md-4">
        <div className="card mb-2">
          <img className="card-img-top" alt=''
            src="https://mdbootstrap.com/img/Photos/Horizontal/Food/4-col/img%20(51).jpg"/>
          <div className="card-body">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the
              card's content.</p>
            <a href='google.com' className="btn btn-primary">Button</a>
          </div>
        </div>
        </div>


		</main>
    </div>
  );
}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdventureDetail));
