import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom'

import {setIpLocation ,setSelectedPlace ,setFlyersInit, setOpenFlyerPane, setSelectedFlyer} from '../../redux/actions'
import { StoreState} from '../../redux/root-reducer';
import user, { IUser } from "../../redux/reducers/user";
import { IFlyer } from "../../redux/reducers/flyer";
import { ILocation} from "../../redux/reducers/location";

import {HomeStyle} from './styled';
import MapWithASearchBox from '../../components/Map/MapWithASearchBox';
import FlyerListSlidePane from '../../components/FlyerListSlidePane'

import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from 'react-sliding-pane';
import { Button, Spinner } from 'reactstrap';
import FlyerListByPlace from '../../components/FlyerListByPlace';
import {getWindowWidth} from '../../utils/functions';

export interface HomeProps extends RouteComponentProps {
  setIpLocation: any,
  setSelectedPlace: any,
  setSelectedFlyer: any,
  setFlyersInit: any,
  setOpenFlyerPane: any,
  reduxLocation: ILocation,
  user: IUser,
  flyer: IFlyer
}
 
const Home: React.SFC<HomeProps> = (props) => {
  const [ipWasSet, setIpWasSet] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false)
  //const [isPaneOpenLeft, setIsPaneOpenLeft] = useState(false);

  useEffect(()=> {
    props.setSelectedFlyer({});
    //clean up work
    return () => {
      setFlyersInit([])
    }

  },[])
  useEffect(()=> {
    if(showMap===true) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition((position) => {
        setGettingLocation(false);
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
    }
  },[showMap]);


  const showMapToggle = () => {
    setShowMap(!showMap)
}

  return (  
    <HomeStyle>
      <div className="MapContainer">
        <div className="BtnControls">
          <div>
            <button
              onClick={showMapToggle}
              className="btn btn-info"
            >
              {showMap? "Hide":"Show"} Map {" "}
              {gettingLocation && <Spinner size="sm" color="light"></Spinner>}
            </button>
          </div>
          <p>{Object.keys(props.user.currentUser).length > 0? props.user.currentUser.name: 'Anonymous User'}</p>
        </div>
        {props.reduxLocation.validPlace === false && <p className="text-danger">Your search is too broad. Please search a business location or address.</p>}
        {ipWasSet && showMap && <MapWithASearchBox/>}
        {/* SLIDE PANE  */}
        <FlyerListSlidePane>
          <Button
            color="primary"
            outline={false}
            onClick={()=>props.history.push("/make-flyer")}
          >Place flyer here</Button>
          <hr/>
          <FlyerListByPlace />
        </FlyerListSlidePane>
      </div>
      {/* About Content */}
      <div className="about">
        <h2>What is Noticely?</h2>
        <hr/>
        <p>Noticely is designed the bring the "age-old" task of "putting up flyers" into the future. 
          It used to be that if you wanted to make notices or spread information, you would have to:
        </p>
        <ul>
          <li>Design flyer and print out many copies.</li>
          <li>Find locations with high foot traffic to place the flyers.</li>
          <li>Physically walk to each location.</li>
          <li>Many times, the location does not have a designated area to place your flyer.</li>
        </ul>
        <h2>How does Noticely help?</h2>
        <hr />
        <p>Noticely simplifies this process. </p>
        <ul>
          <li>No more wasting paper; the flyers are virtual! </li>  
          <li>Find a location with ease using our map. Simply Search any location.</li>
          <li>Select a location and immediately create a flyer there.</li>
          <li>No more worrying if the place has a designated area for flyers.</li>
        </ul>
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
  setOpenFlyerPane,
  setSelectedFlyer
})(Home);