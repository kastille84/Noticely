import React from 'react';
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from 'react-sliding-pane';
import {connect} from 'react-redux';

import { StoreState } from "../../redux/root-reducer";
import { ILocation } from '../../redux/reducers/location';
import { IFlyer } from '../../redux/reducers/flyer';
import {  
    setSelectedPlace,
    setFlyersInit,
    setOpenFlyerPane,
    setWishToDeleteFlyer
} from '../../redux/actions';
import {getWindowWidth} from '../../utils/functions';

import DeleteFlyerModal from '../DeleteFlyerModal';

export interface FlyerListSlidepaneProps {
    reduxLocation: ILocation,
    flyer: IFlyer,
    setSelectedPlace: any,
    setFlyersInit: any,
    setWishToDeleteFlyer: any,
    setOpenFlyerPane: any,
    children: any
}
 
const FlyerListSlidepane: React.SFC<FlyerListSlidepaneProps> = ({
    children,
    setSelectedPlace,
    setFlyersInit,
    setOpenFlyerPane,
    setWishToDeleteFlyer,
    flyer,
    reduxLocation
}) => {

    return ( 
        <div>
            <SlidingPane 
                isOpen={flyer.openFlyerPane}
                from="left"
                width={getWindowWidth()}
                title={`${((reduxLocation||{}).selectedPlace||{}).name||""}`}
                shouldCloseOnEsc
                onRequestClose={() => {
                    setFlyersInit([]);
                    setOpenFlyerPane(false);
                    setSelectedPlace(null);
                }}
            >
                {children}
            </SlidingPane>
            <DeleteFlyerModal modal={flyer.wishToDeleteFlyer} toggleModal={setWishToDeleteFlyer} />
        </div>
     );
}

const mapStateToProps = (state: StoreState) => ({
    reduxLocation: state.location,
    flyer: state.flyer,
})
export default connect(mapStateToProps, {
    setSelectedPlace,
    setFlyersInit,
    setOpenFlyerPane,
    setWishToDeleteFlyer
})(FlyerListSlidepane);