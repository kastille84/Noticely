import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import agent from './agent';
import {getUserInfo} from './redux/actions';

import Navigation from './components/Navigation';

//Containers
import Home from './containers/Home/index';
import MakeFlyer from './containers/MakeFlyer/index';

import {StoreState} from './redux/root-reducer';

export interface AppProps {
  dummy: any,
  getUserInfo: Function
}

const App:React.SFC<AppProps> = ({getUserInfo}) => {
  useEffect(()=> {
    //check if jwt is set
    if(agent.getSession()) {
      //log him in
      getUserInfo();
    }
  },[]);

  return (
    <div className="App">
        {/* Navigation goes here */}
      <Navigation />
      <div className="container mt-4 mb-4">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/make-flyer" component={MakeFlyer} />
          </Switch>
        </Router>
      </div>
      {/* Footer goes here */}
    </div>
  );
}

const mapStateToProps = (state:StoreState) => ({
  dummy: state.dummy
});

export default connect(mapStateToProps ,{
  getUserInfo
})(App);
