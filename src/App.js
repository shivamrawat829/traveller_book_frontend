import React from 'react';
import './App.css';
import Home from './container/Home'
import {
  BrowserRouter as Router,
  Route ,
  Switch, Redirect
} from "react-router-dom";
import AdventureDetail from './container/AdventureDetail/AdventureDetail'
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
import Profile from './container/Profile/Profile';
import ProfilePage from './container/ProfilePage/ProfilePage';

// pages for this kit
import Index from "./views/Index.js";
import NucleoIcons from "./views/NucleoIcons.js";
import LoginPage from "./views/examples/LoginPage.js";
import LandingPage from "./views/examples/LandingPage.js";
import axios from "axios";
import AddPosts from './views/examples/AddPosts';




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
      <Route path='/' exact strict component={Home}{...this.props}></Route>
      <Route path='/adventure_detail' exact strict component={AdventureDetail}></Route>
      <Route path='/profile' exact strict component={Profile}></Route>
      <Route path='/profilepage' exact strict component={ProfilePage}></Route>
      {/* <Route component={PageNotFound}/> */}
      {/* <Home></Home> */}


      <Route path="/index" render={props => <Index {...props} />} />
        <Route
          path="/nucleo-icons"
          render={props => <NucleoIcons {...props} />}
        />
        <Route
          path="/landing-page"
          render={props => <LandingPage {...props} />}
        />
        <Route path="/login-page" render={props => <LoginPage {...props} />} />
        <Route path="/add-posts" render={props => <AddPosts {...props} />} />
        {/* <Redirect to="/index" />
        <Redirect from="/" to="/index" /> */}

    </div>
    </Router>
  );
}
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

