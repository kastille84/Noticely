import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {setIpLocation ,setSelectedPlace} from '../../redux/actions'
import { StoreState} from '../../redux/root-reducer';
import { IUser } from "../../redux/reducers/user";
import { ILocation} from "../../redux/reducers/location";

import {HomeStyle} from './styled';
import MapWithASearchBox from '../../components/Map/MapWithASearchBox';

export interface HomeProps {
  setIpLocation: any,
  setSelectedPlace: any,
  location: ILocation,
  user: IUser
}
 
const Home: React.SFC<HomeProps> = (props) => {
  const [ipWasSet, setIpWasSet] = useState(false);
  const [showMap, setShowMap] = useState(true);

  useEffect(()=> {
    navigator.geolocation.getCurrentPosition((position) => {
      const ltlng = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      props.setIpLocation(ltlng);
      setIpWasSet(true);
      // setTimeout( () => {
      //   this.props.onSetFlyers([]);
      // }, 1000);
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
        </div>
        {props.location.validPlace === false && <p className="text-danger">Your search did not turn up results. Please search a business location or address.</p>}
        {ipWasSet && showMap && <MapWithASearchBox/>}
      </div>
    </HomeStyle>
  );
}

const mapStateToProps = (state: StoreState) => ({
  location: state.location
});

export default connect(mapStateToProps, {
  setIpLocation,
  setSelectedPlace
})(Home);