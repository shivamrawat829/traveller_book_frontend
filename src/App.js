import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route , Switch
} from "react-router-dom";
// import PageNotFound from './components/PagNotFound';
// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/scss/now-ui-kit.scss";
import "./assets/demo/demo.css";
import "./assets/demo/nucleo-icons-page-styles.css";

// newly added
import { connect } from 'react-redux';
//import BaseRouter from './routes';push
import * as actions from './store/actions/auth';
import ProfilePage from './container/ProfilePage/ProfilePage';

// pages for this kit
import Index from "./views/Index.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/examples/LoginPage.js";
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
      <Route path='/profilepage' exact strict component={ProfilePage}></Route>
      <Route path='/user_posts' exact strict component={UserPosts}></Route>
      {/* <Route path="/index" render={props => <Index {...props} />} /> */}
      <Route path="/index" exact strict component={Index}></Route>
        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route path="/login-page" render={props => <LoginPage {...props} />} />
        <Route path="/signup-page" render={props => <SignUp {...props} />} />
        <Route path="/add-posts" render={props => <AddPosts {...props} />} />
        <Route path="/demo" render={props => <Demo {...props} />} />
        <Route component={PagNotFound} />
        {/* <Redirect to="/index" />
        <Redirect from="/" to="/index" /> */}
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

