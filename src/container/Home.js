import React from 'react';
import './Home.css';
import axios from "axios";
import Cards from './Cards/Cards';
import { connect } from 'react-redux';
import * as actions from '../store/actions/auth';
import {withRouter, NavLink} from "react-router-dom";


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


  

class Home extends React.Component {

	state={
		data1 :[],
		title: '',
		description: '',
		place:'',
		rating:'',
		image: null
	  }
	  

	handleChange = (e) => {
		this.setState({
		  [e.target.id]: e.target.value
		})
	  };

	  handleImageChange = (e) => {
		this.setState({
		  image: e.target.files[0]
		})
	  };


	  handleSubmit = (e) => {
		  e.preventDefault();
		  console.log("e.target.elements.username.value", e.target.elements.username.value)
		  console.log("e.target.elements.username.value", e.target.elements.password.value)
		this.props.onAuth(e.target.elements.username.value, e.target.elements.password.value);
		this.props.history.push('/');
	  }

	  


	  handleFormSubmit = (e) => {
		// e.preventDefault();
		console.log('dataaaaaaaaaaaaaa111111111111111',this.state.image);
		let form_data = new FormData();
		form_data.append('image', this.state.image, this.state.image.name);
		form_data.append('title', this.state.title);
		form_data.append('description', this.state.description);
		form_data.append('place', this.state.place);
		form_data.append('rating', this.state.rating);
		console.log("newwwwwwwwwwwwwwwwwwwww", this.state.image)
		let url = 'http://127.0.0.1:8000/api/create/';
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
	  };


	// handleFormSubmit = (event, requestType) =>
	// {
	// 	event.preventDefault();
	// 	console.log(this.state);

	// 	let form_data = new FormData();
	// 	form_data.append('image', this.state.image, this.state.image.name);
	// 	form_data.append('title', this.state.title);
	// 	form_data.append('content', this.state.content);
	// 	console.log(this.state);

	// 	const title = event.target.elements.title.value;
	// 	const description = event.target.elements.description.value;
	// 	const place = event.target.elements.place.value;
	// 	const rating = event.target.elements.rating.value;
	// 	const image = event.target.elements.image.value;
	// 	requestType = 'post'
	// 	console.log("INFOOOOOOOO", title, description, place, image);

	// 	switch(requestType)
	// 	{
	// 		case 'post':
	// 			return axios.post('http://127.0.0.1:8000/api/create/', {
	// 				title : title,
	// 				description : description,
	// 				place : place,
	// 				rating : rating,
	// 				image : image
	// 			})
	// 			.then(res => console.log("resssssssssss",res))
	// 			.catch(error => console.log("errrrr", error))

			
	// 		case 'put':
	// 			return console.log("");
			

	// 		default:
	// 				break;
		
	// 	}
	// }

    
    
      users = {
        name : ['Shubham', 'Trilok' ,'Ravi', 'Raj']
	  }
	  
      componentDidMount()
      {
        axios.get("http://127.0.1:8000/api/posts").then(
          res =>{
          this.setState({
            data1: res.data
          });
        })
      }

    render(){
  return (

    <div>


		{/* Post Submit */}
		<div className="modal" id="post_dialog">
		<div className="modal-dialog post-upload-dialog">
      <div className="modal-content card-body card card-signin my-5">        
            {/* login form */}
            <h6 className="card-title text-center">Posting Something? Make It count...</h6>
            <form onSubmit={(event) => this.handleFormSubmit(event, 'post')} className="form-signin">
              <div className="form-label-group">
                <input name='title' type="text" onChange={this.handleChange} id="title" className="form-control post-upload-dialog-text" placeholder="Title" required />
                {/* <label for="inputEmail">Email address</label> */}
              </div>

              <div className="form-label-group">
                <input name='description' type="text" onChange={this.handleChange} id="description" className="form-control post-upload-dialog-text" placeholder="Description" required/>
                {/* <label for="inputPassword">Password</label> */}
              </div>

			  <div className="form-label-group">
                <input name='place' type="text" id="place" onChange={this.handleChange} className="form-control post-upload-dialog-text" placeholder="Place" required/>
                {/* <label for="inputPassword">Password</label> */}
              </div>

			  <div className="form-label-group">
                <input name='rating' type="number" id="rating" onChange={this.handleChange} className="form-control post-upload-dialog-text" placeholder="Rating" required/>
                {/* <label for="inputPassword">Password</label> */}
              </div>
			  <div className="card-img-choose">
			  <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
				   </div>

              <button className="btn btn-lg btn-primary text-center signinbtn btn-block text-uppercase post-upload-dialog-text" htmltype="submit">Post</button>
              <hr className="my-4"/>
            </form>
      </div>
    </div>
  </div>


{/* login form */}

<div className="modal" id="myModal">
    <div className="modal-dialog">
      <div className="modal-content card-body card card-signin my-5">        
            {/* login form */}

			
            <h5 className="card-title text-center">Traveller Book</h5>
            <form className="form-signin" onSubmit={this.handleSubmit}>

			<div className="form-label-group">
                <input name='username' type="text" id="inputUsername" className="form-control" placeholder="UserName" required />
                {/* <label for="inputEmail">Email address</label> */}
              </div>

              <div className="form-label-group">
                <input name='email' type="email" id="inputEmail" className="form-control" placeholder="Email address"  />
                {/* <label for="inputEmail">Email address</label> */}
              </div>

              <div className="form-label-group">
                <input name='password' type="password" id="inputPassword" className="form-control" placeholder="Password" required/>
                {/* <label for="inputPassword">Password</label> */}
              </div>

              <div className="custom-control custom-checkbox mb-3">
                <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
              </div>

              <button className="btn btn-lg btn-primary text-center signinbtn btn-block text-uppercase" type="submit">Sign in</button>
              <hr className="my-4"/>
              <button className="btn btn-lg btn-google btn-block btn_google text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
              <button className="btn btn-lg btn-facebook btn-block btn_facebook text-uppercase" ><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
			  <button className="btn btn-primary mb-2">

            </button>
            </form>
      </div>
    </div>
  </div>
{/* model end */}


{/* <nav id="menu" class="main-menu mm-menu mm-offcanvas mm-hasnavbar-bottom-1 mm-pagedim-black mm-opened"><div class="mm-panels"><div class="mm-panel mm-hasnavbar mm-opened" id="mm-1"><div class="mm-navbar"><a class="mm-title">MENU</a></div><ul class="mm-listview">
				<li><em class="mm-counter">7</em><a class="mm-next mm-fullsubopen" href="#mm-2" aria-owns="mm-2" aria-haspopup="true"><span class="mm-sronly">Open submenu (Home)</span></a><span><a href="#0">Home</a></span>
					
				</li>
				<li><em class="mm-counter">3</em><a class="mm-next mm-fullsubopen" href="#mm-3" aria-owns="mm-3" aria-haspopup="true"><span class="mm-sronly">Open submenu (Tours)</span></a><span><a href="#0">Tours</a></span>
					
				</li>
				<li><em class="mm-counter">3</em><a class="mm-next mm-fullsubopen" href="#mm-6" aria-owns="mm-6" aria-haspopup="true"><span class="mm-sronly">Open submenu (Hotels)</span></a><span><a href="#0">Hotels</a></span>
					
				</li>
				<li><em class="mm-counter">3</em><a class="mm-next mm-fullsubopen" href="#mm-9" aria-owns="mm-9" aria-haspopup="true"><span class="mm-sronly">Open submenu (Eat &amp; Drink)</span></a><span><a href="#0">Eat &amp; Drink</a></span>
					
				</li>
				<li><span><a href="adventure.html">Adventure</a></span></li>
				<li><em class="mm-counter">9</em><a class="mm-next mm-fullsubopen" href="#mm-12" aria-owns="mm-12" aria-haspopup="true"><span class="mm-sronly">Open submenu (Pages)</span></a><span><a href="#0">Pages</a></span>
					
				</li>
				<li><em class="mm-counter">15</em><a class="mm-next mm-fullsubopen" href="#mm-13" aria-owns="mm-13" aria-haspopup="true"><span class="mm-sronly">Open submenu (Extra)</span></a><span><a href="#0">Extra</a></span>
					
				</li>
				<li><span><a href="https://1.envato.market/DmbYj" target="_parent">Buy template</a></span></li>
			</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-2" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-1" aria-owns="mm-1" aria-haspopup="true"><span class="mm-sronly">Close submenu (Home)</span></a><a class="mm-title" href="#mm-1" aria-hidden="true">Home</a></div><ul class="mm-listview">
						<li><a href="index.html">Home version 1</a></li>
						<li><a href="index-2.html">Home version 2</a></li>
						<li><a href="index-3.html">Home version 3</a></li>
						<li><a href="index-4.html">Home version 4</a></li>
						<li><a href="index-5.html">Home version 5</a></li>
						<li><a href="index-6.html">With Cookie bar (EU law)</a></li>
                        <li><a href="index-7.html">Home version 7</a></li>
					</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-3" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-1" aria-owns="mm-1" aria-haspopup="true"><span class="mm-sronly">Close submenu (Tours)</span></a><a class="mm-title" href="#mm-1" aria-hidden="true">Tours</a></div><ul class="mm-listview">
						<li><em class="mm-counter">4</em>
							<a class="mm-next mm-fullsubopen" href="#mm-4" aria-owns="mm-4" aria-haspopup="true"><span class="mm-sronly">Open submenu (Tours grid)</span></a><span><a href="#0">Tours grid</a></span>
							
						</li>
						<li><em class="mm-counter">4</em>
							<a class="mm-next mm-fullsubopen" href="#mm-5" aria-owns="mm-5" aria-haspopup="true"><span class="mm-sronly">Open submenu (Tours list)</span></a><span><a href="#0">Tours list</a></span>
							
						</li>
						<li><a href="tour-detail.html">Tour detail</a></li>
					</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-4" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-3" aria-owns="mm-3" aria-haspopup="true"><span class="mm-sronly">Close submenu (Tours grid)</span></a><a class="mm-title" href="#mm-3" aria-hidden="true">Tours grid</a></div><ul class="mm-listview">
								<li><a href="tours-grid-isotope.html">Tours grid isotope</a></li>
								<li><a href="tours-grid-sidebar.html">Tours grid sidebar</a></li>
								<li><a href="tours-grid-sidebar-2.html">Tours grid sidebar 2</a></li>
								<li><a href="tours-grid.html">Tours grid simple</a></li>
							</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-5" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-3" aria-owns="mm-3" aria-haspopup="true"><span class="mm-sronly">Close submenu (Tours list)</span></a><a class="mm-title" href="#mm-3" aria-hidden="true">Tours list</a></div><ul class="mm-listview">
								<li><a href="tours-list-isotope.html">Tours list isotope</a></li>
								<li><a href="tours-list-sidebar.html">Tours list sidebar</a></li>
								<li><a href="tours-list-sidebar-2.html">Tours list sidebar 2</a></li>
								<li><a href="tours-list.html">Tours list simple</a></li>
							</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-6" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-1" aria-owns="mm-1" aria-haspopup="true"><span class="mm-sronly">Close submenu (Hotels)</span></a><a class="mm-title" href="#mm-1" aria-hidden="true">Hotels</a></div><ul class="mm-listview">
						<li><em class="mm-counter">4</em>
							<a class="mm-next mm-fullsubopen" href="#mm-7" aria-owns="mm-7" aria-haspopup="true"><span class="mm-sronly">Open submenu (Hotel grid)</span></a><span><a href="#0">Hotel grid</a></span>
							
						</li>
						<li><em class="mm-counter">4</em>
							<a class="mm-next mm-fullsubopen" href="#mm-8" aria-owns="mm-8" aria-haspopup="true"><span class="mm-sronly">Open submenu (Hotel list)</span></a><span><a href="#0">Hotel list</a></span>
							
						</li>
						<li><a href="hotel-detail.html">Hotel detail</a></li>
					</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-7" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-6" aria-owns="mm-6" aria-haspopup="true"><span class="mm-sronly">Close submenu (Hotel grid)</span></a><a class="mm-title" href="#mm-6" aria-hidden="true">Hotel grid</a></div><ul class="mm-listview">
								<li><a href="hotels-grid-isotope.html">Hotel grid isotope</a></li>
								<li><a href="hotels-grid-sidebar.html">Hotel grid sidebar</a></li>
								<li><a href="hotels-grid-sidebar-2.html">Hotel grid sidebar 2</a></li>
								<li><a href="hotels-grid.html">Hotel grid simple</a></li>
							</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-8" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-6" aria-owns="mm-6" aria-haspopup="true"><span class="mm-sronly">Close submenu (Hotel list)</span></a><a class="mm-title" href="#mm-6" aria-hidden="true">Hotel list</a></div><ul class="mm-listview">
								<li><a href="hotels-list-isotope.html">Hotel list isotope</a></li>
								<li><a href="hotels-list-sidebar.html">Hotel list sidebar</a></li>
								<li><a href="hotels-list-sidebar-2.html">Hotel list sidebar 2</a></li>
								<li><a href="hotels-list.html">Hotel list simple</a></li>
							</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-9" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-1" aria-owns="mm-1" aria-haspopup="true"><span class="mm-sronly">Close submenu (Eat &amp; Drink)</span></a><a class="mm-title" href="#mm-1" aria-hidden="true">Eat &amp; Drink</a></div><ul class="mm-listview">
						<li><em class="mm-counter">4</em>
							<a class="mm-next mm-fullsubopen" href="#mm-10" aria-owns="mm-10" aria-haspopup="true"><span class="mm-sronly">Open submenu (Restaurant grid)</span></a><span><a href="#0">Restaurant grid</a></span>
							
						</li>
						<li><em class="mm-counter">4</em>
							<a class="mm-next mm-fullsubopen" href="#mm-11" aria-owns="mm-11" aria-haspopup="true"><span class="mm-sronly">Open submenu (Restaurant list)</span></a><span><a href="#0">Restaurant list</a></span>
							
						</li>
						<li><a href="restaurant-detail.html">Restaurant detail</a></li>
					</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-10" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-9" aria-owns="mm-9" aria-haspopup="true"><span class="mm-sronly">Close submenu (Restaurant grid)</span></a><a class="mm-title" href="#mm-9" aria-hidden="true">Restaurant grid</a></div><ul class="mm-listview">
								<li><a href="restaurants-grid-isotope.html">Restaurant grid isotope</a></li>
								<li><a href="restaurants-grid-sidebar.html">Restaurant grid sidebar</a></li>
								<li><a href="restaurants-grid-sidebar-2.html">Restaurant grid sidebar 2</a></li>
								<li><a href="restaurants-grid.html">Restaurant grid simple</a></li>
							</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-11" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-9" aria-owns="mm-9" aria-haspopup="true"><span class="mm-sronly">Close submenu (Restaurant list)</span></a><a class="mm-title" href="#mm-9" aria-hidden="true">Restaurant list</a></div><ul class="mm-listview">
								<li><a href="restaurants-list-isotope.html">Restaurant list isotope</a></li>
								<li><a href="restaurants-list-sidebar.html">Restaurant list sidebar</a></li>
								<li><a href="restaurants-list-sidebar-2.html">Restaurant list sidebar 2</a></li>
								<li><a href="restaurants-list.html">Restaurant list simple</a></li>
							</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-12" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-1" aria-owns="mm-1" aria-haspopup="true"><span class="mm-sronly">Close submenu (Pages)</span></a><a class="mm-title" href="#mm-1" aria-hidden="true">Pages</a></div><ul class="mm-listview">
						<li><a href="about.html">About</a></li>
						<li><a href="media-gallery.html">Media gallery</a></li>
						<li><a href="help.html">Help Section</a></li>
						<li><a href="faq.html">Faq Section</a></li>
						<li><a href="wishlist.html">Wishlist page</a></li>
						<li><a href="contacts.html">Contacts</a></li>
						<li><a href="login.html">Login</a></li>
						<li><a href="register.html">Register</a></li>
						<li><a href="blog.html">Blog</a></li>
					</ul></div><div class="mm-panel mm-hidden mm-hasnavbar" id="mm-13" aria-hidden="true"><div class="mm-navbar"><a class="mm-btn mm-prev" href="#mm-1" aria-owns="mm-1" aria-haspopup="true"><span class="mm-sronly">Close submenu (Extra)</span></a><a class="mm-title" href="#mm-1" aria-hidden="true">Extra</a></div><ul class="mm-listview">
						<li><a href="html_rtl/index.html">RTL Version <strong>New!</strong></a></li>
                    	<li><a href="menu-options.html">Menu Position Options</a></li>
                    	<li><a href="tour-detail-singlemonth-datepicker.html">Single month Datepicker</a></li>
						<li><a href="404.html">404 Error page</a></li>
						<li><a href="cart-1.html">Cart page 1</a></li>
						<li><a href="cart-2.html">Cart page 2</a></li>
						<li><a href="cart-3.html">Cart page 3</a></li>
						<li><a href="pricing-tables.html">Responsive pricing tables</a></li>
						<li><a href="coming_soon/index.html">Coming soon</a></li>
						<li><a href="invoice.html">Invoice</a></li>
						<li><a href="icon-pack-1.html">Icon pack 1</a></li>
						<li><a href="icon-pack-2.html">Icon pack 2</a></li>
						<li><a href="icon-pack-3.html">Icon pack 3</a></li>
						<li><a href="icon-pack-4.html">Icon pack 4</a></li>
                        <li><a href="hamburgers.html">Animated Hamburgers</a></li>
					</ul></div></div>
			
		<div class="mm-navbars-bottom"><div class="mm-navbar mm-navbar-size-1"><a href="#0">© 2018 Panagea</a></div></div></nav>
 */}


<header className="header menu_fixed">
		{/* <div id="preloader"><div data-loader="circle-side"></div></div> */}
		<div id="logo">
			<a href="index.html">
				{/* logos */}
				{/* <img src="img/logo.png" width="150" height="36" data-retina="true" alt="" className="logo_normal"/> */}
				{/* <img src="img/logo_sticky.png" width="150" height="36" data-retina="true" alt="" className="logo_sticky"/> */}
			</a>
		</div>

		
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
    
					<li data-toggle="modal" data-target="#post_dialog"><span><a href="#0">Post</a></span>
				</li>	
    
                    :
    
					<li >
					</li>	
                }

				{
                    this.props.isAuthenticated ?
    
					<li onClick={this.props.logout} ><span><a href="#0">Logout</a></span>
					</li>
    
                    :
    
					<li data-toggle="modal" data-target="#myModal"><span><a href="#0">Login/Signup</a></span>
					</li>	
                }



			</ul>
		</nav>
	</header>

	 {/* <div class='header-container'>
		 <div class='video-container'>
			 <video autoplay="autoplay" preload='true' loop='loop' volume='0' >

				 <source src='../videos/clip.mp4' type='video/mp4'/>
					 <source src='../videos/clip.webm' type='video/webm'/> 
					 <source src='../videos/clip.ogv' type='video/ogv'/> 


			 </video>
		 </div>
	 </div> */}
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
		<img src="../images/background.png" alt="" className="header-video--media" data-video-src="video/adventure" data-teaser-source="video/adventure" data-provider="" data-video-width="1920" data-video-height="960"/>
		<video autoplay="true" loop="loop" muted="" id="teaser-video" class="teaser-video">
			<source src="../videos/clip.mp4" type="video/mp4"/>
			<source src='../videos/clip.webm' type='video/webm'/> 
			<source src="../videos/clip.ogv" type="video/ogv"/>
		</video>
	</section>

{/* main page */}


<main>
	<section>
		<div className="main_title_3">
			<span><em></em></span>
			<h2>Last Added Adventures Tours</h2>
			<p>Choose the destinations from the destinations below .</p>
		</div>
				<div className="row">
					{/* logic to make dynamic cards */}
					{this.state.data1.map((link) =>
						<Cards key={link.id} alldata={link}></Cards>
						)}
				</div>
		<a href="#0"><strong>View all {this.state.data1.length} <i className="arrow_carrot-right"></i></strong></a>
	</section>

	<div className="call_section adventure">
		<div className="container clearfix">
			<div className="col-lg-5 col-md-6 float-right wow animated" data-wow-offset="250" style={{visibility: 'visible'}}>
				<div className="block-reveal">
					<div className="block-vertical"></div>
						<div className="box_1">
							<h3>Enjoy a GREAT travel with us</h3>
							<p>Ready to explore the greatest possiblities with us? See
								what you can do with us. </p>
							<a href="adventure-detail.html" className="btn_1 rounded">Read more</a>
						</div>
					</div>
				</div>
			</div>
		</div>
</main>


{/* Jumbotron */}

<div className="jumbotron jumbotron-fluid">
  <div className="container text-center">
    <h1>Bootstrap Tutorial</h1>
    <p>Bootstrap is the most popular HTML, CSS...</p>
  </div>
</div>

{/* welcome section */}
<div className='container-fluid padding'>
  <div className='row welcome text-center'>
    <div className='col-12'>
      <h1 className='display-4'>Try This Shit</h1>
    </div>
    <hr/>
    <div className='col-12'>
      <p className='lead'>Welcome to our World</p>
    </div>
  </div>
</div>

{/* three coloumns  */}

<div className='container-fluid padding'>
  <div className='row padding text-center'>
    <div className='col-xs-12 col-sm-4 col-md-4'>
      <i className='fas fa-code'></i>
    <h3>HTML</h3>
    <p>THIS IS HTML</p>
    </div>

    <div className='col-xs-12 col-sm-4 col-md-4'>
      <i className='fas fa-bold'></i>
    <h3>BOOTSTRAP</h3>
    <p>THIS IS BOOTSTRAP</p>
    </div>

    <div className='col-xs-12 col-sm-4 col-md-4'>
      <i className='fab fa-css3'></i>
    <h3>CSS</h3>
    <p>THIS IS CSS</p>
    </div>

    <hr className='my-4'/>
  </div>
</div>

{/* 2 coloumn section */}

{/* <div className='container-fluid padding'>
  <div className='row padding'>
    <div className='col-md-12 col-md-6'>
		<h2>Why Us?</h2>
		<p>Ask Yourself and you let us know...</p>
		<br/>
    		<a href='www.google.com' className='btn btn-primary'>Learn More</a>
    </div>
    <hr className='my-4'/>
  </div>
</div>

<hr className='my-4'/> */}
{/* Team */}

{/* <div className='container-fluid padding'>
  <div className='row welcome text-center'>
    <div className='col-12'>
    	<h1 className='display-4'>Why Us?</h1>
    </div>
  </div>
</div> */}

{/* cards for team */}
{/* 
<div className='container-fluid padding'>
  <div className='row padding'>
    <div className='col-md-4'>
      <div className='card'>
          <img src={require('../images/adventure.jpg')} alt="" className='card-img-top' />
          <div className='card-body'>
            <h4 className='card-title'>Trilok Sharma</h4>
            <p className='card-text'>Trilok is just a normal developer...</p>
            <a href='www.google.com' className='btn btn-outline-secondary'>See Profile</a>
          </div>
      </div>
    </div>

    <div className='col-md-4'>
      <div className='card'>
          <img src={require('../images/adventure.jpg')}  alt="" className='card-img-top' />
          <div className='card-body'>
            <h4 className='card-title'>Trilok Sharma</h4>
            <p className='card-text'>Trilok is just a normal developer...</p>
            <a href='www.google.com' className='btn btn-outline-secondary'>See Profile</a>
          </div>
      </div>
    </div>

    <div className='col-md-4'>
      <div className='card'>
          <img src={require('../images/adventure.jpg')} alt="" className='card-img-top' />
          <div className='card-body'>
            <h4 className='card-title'>Trilok Sharma</h4>
            <p className='card-text'>Trilok is just a normal developer...</p>
            <a href='www.google.com' className='btn btn-outline-secondary'>See Profile</a>
          </div>
      </div>
    </div>
  </div>
</div> */}

{/* connect with us */}

<div className='container-fluid padding'>
  <div className='row padding text-center'>
    <div className='col-12'>
    <h2 className='display-4'>Connect</h2>
    </div>
    <div className='col-12 social padding'>
        <a href="www.google.com"><i className='fab fa-facebook'></i></a>
        <a href="www.google.com"><i className='fab fa-twitter'></i></a>
        <a href="www.google.com"><i className='fab fa-google-plug-g'></i></a>
        <a href="www.google.com"><i className='fab fa-instagram'></i></a>
        <a href="www.google.com"><i className='fab fa-youtube'></i></a>
    </div>
  </div>
</div>

{/* footer */}

<footer>
		<div className="container margin_60_35">
			<div className="row">
				<div className="col-lg-5 col-md-12 p-r-5">
					<p><img src="img/logo.png" width="150" height="36" data-retina="true" alt=""/></p>
					<p>Mea nibh meis philosophia eu. Duis legimus efficiantur ea sea. Id placerat tacimates definitionem sea, prima quidam vim no. Duo nobis persecuti cu. Nihil facilisi indoctum an vix, ut delectus expetendis vis.</p>
					<div className="follow_us">
						<ul>
							<li>Follow us</li>
							<li><a href="#0"><i className="ti-facebook"></i></a></li>
							<li><a href="#0"><i className="ti-twitter-alt"></i></a></li>
							<li><a href="#0"><i className="ti-google"></i></a></li>
							<li><a href="#0"><i className="ti-pinterest"></i></a></li>
							<li><a href="#0"><i className="ti-instagram"></i></a></li>
						</ul>
					</div>
				</div>
				<div className="col-lg-3 col-md-6 ml-lg-auto">
					<h5>Useful links</h5>
					<ul className="links">
						<li><a href="about.html">About</a></li>
						<li><a href="login.html">Login</a></li>
						<li><a href="register.html">Register</a></li>
						<li><a href="blog.html">News &amp; Events</a></li>
						<li><a href="contacts.html">Contacts</a></li>
					</ul>
				</div>
				<div className="col-lg-3 col-md-6">
					<h5>Contact with Us</h5>
					<ul className="contacts">
						<li><a href="tel://61280932400"><i className="ti-mobile"></i> + 61 23 8093 3400</a></li>
						<li><a href="mailto:info@Panagea.com"><i className="ti-email"></i> info@Panagea.com</a></li>
					</ul>
					<div id="newsletter">
					<h6>Newsletter</h6>
					<div id="message-newsletter"></div>
					<form method="post" action="assets/newsletter.php" name="newsletter_form" id="newsletter_form">
						<div className="form-group">
							<input type="email" name="email_newsletter" id="email_newsletter" className="form-control" placeholder="Your email"/>
							<input type="submit" value="Submit" id="submit-newsletter"/>
						</div>
					</form>
					</div>
				</div>
			</div>
			{/* <!--/row--> */}
			<hr/>
			<div className="row">
				<div className="col-lg-6">
					<ul id="footer-selector">
						<li>
							<div className="styled-select" id="lang-selector">
								<select>
									<option defaultValue='English' value="English" >English</option>
									<option defaultValue='English' value="French">French</option>
									<option defaultValue='English' value="Spanish">Spanish</option>
									<option defaultValue='English' value="Russian">Russian</option>
								</select>
							</div>
						</li>
						<li>
							<div className="styled-select" id="currency-selector">
								<select>
									<option defaultValue='English' value="US Dollars" >US Dollars</option>
									<option defaultValue='English' value="Euro">Euro</option>
								</select>
							</div>
						</li>
						{/* <li><img src="img/cards_all.svg" alt=""/></li> */}
					</ul>
				</div>
				<div className="col-lg-6">
					<ul id="additional_links">
						<li><a href="#0">Terms and conditions</a></li>
						<li><a href="#0">Privacy</a></li>
						<li><span>© 2019 Panagea</span></li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
    </div>
  );
}
}



// const WrappedNormalLoginForm = Form.create()(Home);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));


// export default Home;