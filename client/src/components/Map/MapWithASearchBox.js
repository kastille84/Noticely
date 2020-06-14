/* eslint-disable no-undef */
import React from 'react';
import _ from "lodash";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import  SearchBox from "react-google-maps/lib/components/places/SearchBox";
import { connect } from 'react-redux';
import {setSelectedPlace, setValidPlace, setOpenFlyerPane} from '../../redux/actions';
import './Map.css';

const MapWithASearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB_uJWRCI0GpbqK9qSMlpvcgB_Fs6npBsA&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }}>Loading..</div>,
    containerElement: <div style={{ height: `500px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: this.props.location.ipLocation.lat, 
          lng: this.props.location.ipLocation.lng
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          console.log('places', places);
          // ******* Check Validity of Place
          if( !checkPlaceValidity(places, this.props) ) {
              return;
          }
           // ******* Set selected place
          const selectedPlace = {
              placeId: places[0].place_id,
              formatted_address: places[0].formatted_address,
              name: places[0].name,
              latlng: {
                lat: places[0].geometry.location.lat(),
                lng: places[0].geometry.location.lng()
              }
          }

          this.props.setSelectedPlace(selectedPlace);
          // action to open place slider
          this.props.setOpenFlyerPane(true);

          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },        
      })
    }
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={12}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    className={"Map"}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      //controlPosition={google.maps.ControlPosition.TOP_RIGHT}
      controlPosition={2}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search location for flyers"
        className={"Map_Input"}
      />
    </SearchBox>
    {props.markers.map((marker, index) =>
      <Marker 
        key={index} 
        position={marker.position} 
        title={props.location.selectedPlace.name}
        onClick={()=> {
            props.setOpenFlyerPane(true)
        }}
        >
        </Marker>
    )}
  </GoogleMap>
);

const checkPlaceValidity = (places, props) => {
    let foundStreetNumber = false;
    //typed in a made up address
    if(places.length===0 || !places[0].address_components) {
        props.setValidPlace(false);
        return false;
    }

    for (let c of places[0].address_components) {
        if (c.types[0] === 'street_number') {
            foundStreetNumber = true;
        }
    }

    if (foundStreetNumber) {
        // set validPlace on locationRedux ot true
        props.setValidPlace(true);
        return true;
    } else {
        props.setValidPlace(false);
        return false;
    }
}



const mapStateToProps = (state) => {
    return {
        location: state.location,
        //userRedux: state.userRedux,
        //flyerRedux: state.flyerRedux
    }
}

export default connect(mapStateToProps, {
    setValidPlace,
    setSelectedPlace,
    setOpenFlyerPane
})(MapWithASearchBox);