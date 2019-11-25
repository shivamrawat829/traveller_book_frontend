import React from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import {withRouter} from "react-router-dom";
import {
    NavLink 
  } from "react-router-dom";


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


class Profile extends React.Component{

    render(){
        return(

<div>

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
					{/* <ul>
						<li><a href="index.html">Home version 1</a></li>
						<li><a href="index-2.html">Home version 2</a></li>
					</ul> */}
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
  		
			</ul>
		</nav>
	</header>

    <main>
  {/* <section className="profile_background">
	
      <img src={require('../../images/background.png')} alt="" className="header-video--media" data-video-src="video/adventure" data-teaser-source="video/adventure" data-provider="" data-video-width="1920" data-video-height="960" />
      
		
	</section> */}



    <div class="main-secction">
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12 image-section">
                <img src={require('../../images/background.png')} alt=""/>
            </div>
            <div class="row user-left-part">
                <div class="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                    <div class="row ">
                        <div class="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                            <img alt="" src={require('../../images/rajesh.png')} class="rounded-circle"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div className="row">
  <div className="col-sm-12 col-md-3 col-lg-3 col-xl-2 margin">
  {/* <img alt='' src={require( '../../images/background.png')} className='card-img-top' /> */}
  </div>
  <div className="col-sm-12 col-md-9 col-lg-9 col-xl-10 margin" style={{margin: "auto"}}>
  <div className="card border-primary mb-3" style={{border: "1px solid"}}>
    <div className="card-body">
    
      <h4 className="card-title text-center">Personal Information</h4>
      <div className="row ">
      <h5 className="card-text">Name : </h5>
      <h5 className="card-text">Rajesh</h5>
      </div>
      <div className="row ">
      <h5 className="card-text">Email : </h5>
      <h5 className="card-text">rajeshrawat5050@gmail.com</h5>
      </div>
      <div className="row ">
      <h5 className="card-text">Phone no : </h5>
      <h5 className="card-text">8700501017</h5>
      </div>

    </div>
  </div>
  
  </div>
</div>


    </main>



{/* <div class="row py-5 px-4">
    <div class="col-xl-12 col-md-12 col-sm-12 mx-auto">

        <div class="bg-white shadow rounded overflow-hidden">
            <div class="px-4 pt-0 pb-4 bg-dark">
                <div class="media align-items-end profile-header">
                    <div class="profile mr-3"><img src="https://d19m59y37dris4.cloudfront.net/university/1-1-1/img/teacher-4.jpg" alt="..." width="130" class="rounded mb-2 img-thumbnail"/><a href="#" class="btn btn-dark btn-sm btn-block">Edit profile</a></div>
                    <div class="media-body mb-5 text-white">
                        <h4 class="mt-0 mb-0">Manuella Tarly</h4>
                        <p class="small mb-4"> <i class="fa fa-map-marker mr-2"></i>San Farcisco</p>
                    </div>
                </div>
            </div>

            <div class="bg-light p-4 d-flex justify-content-end text-center">
                <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                        <h5 class="font-weight-bold mb-0 d-block">241</h5><small class="text-muted"> <i class="fa fa-picture-o mr-1"></i>Photos</small>
                    </li>
                    <li class="list-inline-item">
                        <h5 class="font-weight-bold mb-0 d-block">84K</h5><small class="text-muted"> <i class="fa fa-user-circle-o mr-1"></i>Followers</small>
                    </li>
                </ul>
            </div>
        </div>

    </div> */}
{/* </div> */}
</div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));