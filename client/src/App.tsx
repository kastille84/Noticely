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
import ViewFlyer from './containers/ViewFlyer';
import Manage from './containers/Manage';
import EditFlyer from './containers/EditFlyer';

import {StoreState} from './redux/root-reducer';
import MakeFlyerFromTemplate from './containers/MakeFlyerFromTemplate';

export interface AppProps {
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
        <Router>
          <Navigation />
          <div className="container mt-4 mb-4">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/make-flyer" component={MakeFlyer} />
                <Route exact path="/make-from-template" component={MakeFlyerFromTemplate} />
                <Route exact path="/view-flyer" component={ViewFlyer} />
                <Route exact path="/manage" component={Manage} />
                <Route exact path="/edit-flyer" component={EditFlyer} />
              </Switch>
          </div>
        </Router>
      {/* Footer goes here */}
    </div>
  );
}

const mapStateToProps = (state:StoreState) => ({
});

export default connect(mapStateToProps ,{
  getUserInfo
})(App);
