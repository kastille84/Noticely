import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom'

import {setIpLocation ,setSelectedPlace ,setFlyersInit, setOpenFlyerPane} from '../../redux/actions'
import { StoreState} from '../../redux/root-reducer';
import user, { IUser } from "../../redux/reducers/user";
import { IFlyer } from "../../redux/reducers/flyer";
import { ILocation} from "../../redux/reducers/location";

import {HomeStyle} from './styled';
import MapWithASearchBox from '../../components/Map/MapWithASearchBox';

import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from 'react-sliding-pane';
import { Button } from 'reactstrap';
import FlyerListByPlace from '../../components/FlyerListByPlace';

export interface HomeProps extends RouteComponentProps {
  setIpLocation: any,
  setSelectedPlace: any,
  setFlyersInit: any,
  setOpenFlyerPane: any,
  reduxLocation: ILocation,
  user: IUser,
  flyer: IFlyer
}
 
const Home: React.SFC<HomeProps> = (props) => {
  const [ipWasSet, setIpWasSet] = useState(false);
  const [showMap, setShowMap] = useState(true);
  //const [isPaneOpenLeft, setIsPaneOpenLeft] = useState(false);

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position) => {
      const ltlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      props.setIpLocation(ltlng);
      setIpWasSet(true);
      setTimeout( () => {
        props.setFlyersInit([]);
      }, 1000);
      props.setSelectedPlace(null);
    })
  },[]);

  const showMapToggle = () => {
    setShowMap(!showMap)
}

  return (  
    <HomeStyle>
      <div className="MapContainer">
        <div className="BtnControls">
          <button
            onClick={showMapToggle}
            className="btn btn-info"
          >
            {showMap? "Hide":"Show"} Map
          </button>
          <p>{Object.keys(props.user.currentUser).length > 0? props.user.currentUser.name: 'Anonymous User'}</p>
        </div>
        {props.reduxLocation.validPlace === false && <p className="text-danger">Your search is too broad. Please search a business location or address.</p>}
        {ipWasSet && showMap && <MapWithASearchBox/>}
        <SlidingPane 
          isOpen={props.flyer.openFlyerPane}
          from="left"
          width="50%"
          title={`Flyer Notices at ${((props.reduxLocation||{}).selectedPlace||{}).name||""}`}
          shouldCloseOnEsc
          onRequestClose={() => {
            props.setFlyersInit([]);
            props.setOpenFlyerPane(false);
            props.setSelectedPlace(null);
          }}
        >
          <Button
            color="primary"
            outline={false}
            onClick={()=>props.history.push("/make-flyer")}
          >Place flyer here</Button>
          <hr/>
          <FlyerListByPlace />
        </SlidingPane>
      </div>
    </HomeStyle>
  );
}

const mapStateToProps = (state: StoreState) => ({
  reduxLocation: state.location,
  flyer: state.flyer,
  user: state.user
});

export default connect(mapStateToProps, {
  setIpLocation,
  setSelectedPlace,
  setFlyersInit,
  setOpenFlyerPane
})(Home);