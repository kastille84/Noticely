import React, { useEffect} from 'react';
import {connect} from 'react-redux';

import {FlyerListByPlaceStyle} from './styled';
import { StoreState } from '../../redux/root-reducer';
import {ILocation} from '../../redux/reducers/location';
import { IFlyer } from '../../redux/reducers/flyer';
import {getFlyersByPlace} from '../../redux/actions/flyer';

export interface FlyerListByPlaceProps {
    reduxLocation: ILocation,
    reduxFlyer: IFlyer,
    getFlyersByPlace: any
}
 
const FlyerListByPlace: React.SFC<FlyerListByPlaceProps> = ({
    reduxLocation,
    reduxFlyer,
    getFlyersByPlace
}) => {

    useEffect(() => {
        // fetch all flyers from this location
        getFlyersByPlace(reduxLocation.selectedPlace.placeId);
    },[]);

    return ( 
        <FlyerListByPlaceStyle>
            {reduxFlyer.flyers.length>0 && 
            reduxFlyer.flyers.map((flyer, idx) => (
                <div>{flyer.heading}</div>
            ))}
            {reduxFlyer.flyers.length===0 &&
                <p>There are no flyer notices here. Would you like to place one here?</p>
            }
        </FlyerListByPlaceStyle>
     );
}

const mapStateToProps = (state: StoreState) => ({
    reduxLocation: state.location,
    reduxFlyer: state.flyer
})

export default connect(mapStateToProps, {
    getFlyersByPlace
})(FlyerListByPlace);