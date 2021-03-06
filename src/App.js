import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route , Switch
} from "react-router-dom";

import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";

import { connect } from 'react-redux';
import * as actions from './store/actions/auth';
import ProfilePage from './views/examples/ProfilePage';

import Index from "./views/Index.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/examples/LoginPage.js";
import ResetPassword from './views/examples/ResetPassowrd';
import LandingPage from "./views/examples/LandingPage.js";
import AddPosts from './views/examples/AddPosts';

import SignUp from './views/index-sections/SignUp';

import Demo from './views/index-sections/demosignin';
import UserPosts from './views/examples/UserPost';
import PagNotFound from './views/examples/PageNotFound';



class App extends React.Component {

  state = {
    data : []
  }

  componentDidMount() {
    this.props.onTryAutoSignup();

  
  }


render(){
  return (
    <Router>
    <div className="App">
    <Switch>
      <Route path='/myprofile' exact strict component={ProfilePage}></Route>
      <Route path='/user-post' exact strict component={UserPosts}></Route>
      {/* <Route path="/index" render={props => <Index {...props} />} /> */}
      <Route path="/" exact strict component={Index}></Route>
        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route path="/login" render={props => <LoginPage {...props} />} />
        <Route path="/api/password_reset" render={props => <ResetPassword {...props}/>} />
        <Route path="/signup" render={props => <SignUp {...props} />} />
        <Route path="/add-posts" render={props => <AddPosts {...props} />} />
        <Route path="/demo" render={props => <Demo {...props} />} />
        <Route component={PagNotFound} />
        </Switch>

    </div>
    </Router>
  );
}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token_is : state.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

