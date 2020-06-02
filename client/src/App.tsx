import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Navigation from './components/Navigation';
//Containers
import Home from './containers/Home/index';

import {StoreState} from './redux/root-reducer';


function App() {
  return (
    <div className="App">
        {/* Navigation goes here */}
      <Navigation />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
      {/* Footer goes here */}
    </div>
  );
}

const mapStateToProps = (state:StoreState) => ({
  dummy: state.dummy
});

export default connect(mapStateToProps)(App);
