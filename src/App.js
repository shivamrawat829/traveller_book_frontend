import React from 'react';
import './App.css';
import Home from './container/Home'
import {
  BrowserRouter as Router,
  Route 
} from "react-router-dom";
import AdventureDetail from './container/AdventureDetail/AdventureDetail'
// import PageNotFound from './components/PagNotFound';


// newly added
import { connect } from 'react-redux';
//import BaseRouter from './routes';push
import * as actions from './store/actions/auth';
import Profile from './container/Profile/Profile';

class App extends React.Component {

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
      {/* <Route component={PageNotFound}/> */}
      {/* <Home></Home> */}
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

