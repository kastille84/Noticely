import React from 'react';
import {connect} from 'react-redux';
import {StoreState} from './redux/root-reducer';


function App() {
  return (
    <div className="App">
        <div>Hey</div>
    </div>
  );
}

const mapStateToProps = (state:StoreState) => ({
  dummy: state.dummy
});

export default connect(mapStateToProps)(App);
