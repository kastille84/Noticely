import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Spinner} from 'reactstrap';

import {FlyerListByPlaceStyle} from './styled';
import { StoreState } from '../../redux/root-reducer';
import {ILocation} from '../../redux/reducers/location';
import { IFlyer } from '../../redux/reducers/flyer';
import {getFlyersByPlace} from '../../redux/actions/flyer';
import FlyerListItem from '../FlyerListItem';
import { IUser } from '../../redux/reducers/user';
import { Surface } from 'react-native';
import { IsEmptyObj } from '../../utils/functions';

export interface FlyerListByPlaceProps {
    reduxLocation: ILocation,
    reduxFlyer: IFlyer,
    getFlyersByPlace: any,
    user: IUser
}
 
const FlyerListByPlace: React.SFC<FlyerListByPlaceProps> = ({
    reduxLocation,
    reduxFlyer,
    getFlyersByPlace,
    user
}) => {
    useEffect(() => {
        // fetch all flyers from this location
        getFlyersByPlace(reduxLocation.selectedPlace.placeId);
    },[]);

    const determineIfBelongsToUser = (flyer:any) => {
        if(
            flyer.user && 
            !IsEmptyObj(user.currentUser) &&
            (flyer.user._id ===user.currentUser._id)
        ) {
            return true;
        } else {
            return false;
        }
    }

    return ( 
        <FlyerListByPlaceStyle>
            {reduxFlyer.flyers.length>0 && 
            reduxFlyer.flyers.map((flyer, idx) => (
                <FlyerListItem flyer={flyer} belongsToUser={determineIfBelongsToUser(flyer)} />
            ))}
            {reduxFlyer.fetchingFlyers && <Spinner color="success" />}
            {!reduxFlyer.fetchingFlyers && reduxFlyer.flyers.length===0 &&
                <p>There are no flyer notices here. Would you like to place one here?</p>
            }
        </FlyerListByPlaceStyle>
     );
}

const mapStateToProps = (state: StoreState) => ({
    reduxLocation: state.location,
    reduxFlyer: state.flyer,
    user: state.user
})

export default connect(mapStateToProps, {
    getFlyersByPlace
})(FlyerListByPlace);