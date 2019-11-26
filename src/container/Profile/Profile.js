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




  <br/>

<div class="container">

  <br/>
  {/* <!-- Nav pills --> */}
  <ul class="nav nav-pills" role="tablist">
    <li class="nav-item">
      <a class="nav-link active" data-toggle="pill" href="#home">Profile</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="pill" href="#menu1">Setting</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" data-toggle="pill" href="#menu2">Posts</a>
    </li>
  </ul>

  {/* <!-- Tab panes --> */}
  <div class="tab-content">
    <div id="home" class="container tab-pane active"><br/>

    {/* style={{border: "1px solid"}} */}

  <div className="card border-primary mb-3" >
    <div className="card-body">
    
      {/* <h4 className="card-title text-center">Personal Information</h4>
      <div className="row ">
      <h5 className="card-text">Name : </h5>
      <h5 className="card-text">Rajesh</h5>
      </div>

      <input type="text" class="first_name" name="firstName"  autocomplete="name" tabindex="1" >
      </input>
      <label for="firstName" class="label_name">First Name</label>

      <div className="row ">
      <h5 className="card-text">Email : </h5>
      <h5 className="card-text">rajeshrawat5050@gmail.com</h5>
      </div>
      <div className="row ">
      <h5 className="card-text">Phone no : </h5>
      <h5 className="card-text">8700501017</h5>
      </div> */}




      <div class="l022CW">
   <div class="_2aK_Hc"><span class="_10it6k">Personal Information</span><span class="_1x4IU1">Edit</span></div>
   <form>
      <div class="_2kN0A- row">
         <div class="_3wj6q3">
            <div class="Th26Zc"><input type="text" class="_16qL6K _2pf-sU _366U7Q" name="firstName" required="" disabled="true" autocomplete="name" tabindex="1" value=""/>
            <label for="firstName" class="_20i8vs">First Name</label>
            </div>
         </div>
         <div class="_3wj6q3">
            <div class="Th26Zc"><input type="text" class="_16qL6K _2pf-sU _366U7Q" name="lastName"  autocomplete="name" tabindex="2" />
            <label for="lastName" class="_20i8vs">Last Name</label>
            </div>
         </div>

         <button class="_2AkmmA rAx-Sv" type="submit" tabindex="5">SAVE</button>

      </div>
      <div class="yt2AKW"> Your Gender </div>
      <div>
         <label for="Male" class="_8J-bZE _2FAt1l _1YWe2- _2pmKiA _2tcMoY _1Icwrf">
            <input type="radio" disabled="" class="_2haq-9" name="gender" readonly="" id="Male" value="on"/>
            <div class="_6ATDKp"></div>
            <div class="_2o59RR"><span disabled="" tabindex="3">Male</span></div>
         </label>
         <label for="Female" class="_8J-bZE _2FAt1l _2pmKiA _2tcMoY">
            <input type="radio" disabled="" class="_2haq-9" name="gender" readonly="" id="Female" value="on"/>
            <div class="_6ATDKp"></div>
            <div class="_2o59RR"><span disabled="" tabindex="4">Female</span></div>
         </label>
      </div>
   </form>
</div>



    </div>
  </div>



      {/* <h3>HOME</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
    </div>
    <div id="menu1" class="container tab-pane fade"><br/>
      <h3>Menu 1</h3>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div id="menu2" class="container tab-pane fade"><br/>
      <h3>Menu 2</h3>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
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