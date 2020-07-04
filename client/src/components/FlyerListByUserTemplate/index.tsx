import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Spinner} from 'reactstrap';

import {FlyerListByUserTemplateStyle} from './styled';
import { StoreState } from '../../redux/root-reducer';
import {ILocation} from '../../redux/reducers/location';
import { IFlyer } from '../../redux/reducers/flyer';
import {getFlyersByUser} from '../../redux/actions/flyer';
import { IUser } from '../../redux/reducers/user';
import { IsEmptyObj } from '../../utils/functions';
import FlyerListItemForTemplate from '../FlyerListItemForTemplate';

export interface FlyerListByUserTemplateProps {
    reduxLocation: ILocation,
    reduxFlyer: IFlyer,
    getFlyersByUser: any,
    user: IUser
}
 
const FlyerListByUserTemplate: React.SFC<FlyerListByUserTemplateProps> = ({
    reduxLocation,
    reduxFlyer,
    getFlyersByUser,
    user
}) => {
    useEffect(() => {
        // fetch all flyers from this location
        getFlyersByUser(user.currentUser._id);
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
        <FlyerListByUserTemplateStyle>
            {reduxFlyer.flyers.length>0 && 
            reduxFlyer.flyers.filter((flyer,idx)=>flyer.template==="template").map((flyer, idx) => (
                <FlyerListItemForTemplate key={idx} flyer={flyer} belongsToUser={determineIfBelongsToUser(flyer)} />
            ))}
            {reduxFlyer.fetchingFlyers && <Spinner color="success" />}
            {!reduxFlyer.fetchingFlyers && reduxFlyer.flyers.filter((flyer,idx)=>flyer.template==="template").length===0 &&
                <p>There are no templates to chose from. When making a flyer, check off the option to make flyer into a template.</p>
            }
        </FlyerListByUserTemplateStyle>
     );
}

const mapStateToProps = (state: StoreState) => ({
    reduxLocation: state.location,
    reduxFlyer: state.flyer,
    user: state.user
})

export default connect(mapStateToProps, {
    getFlyersByUser
})(FlyerListByUserTemplate);