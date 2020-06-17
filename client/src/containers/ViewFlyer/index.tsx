import React from 'react';
import {connect} from 'react-redux';
import { StoreState } from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';

export interface ViewFlyerProps {
    flyer: IFlyer
}
 
const ViewFlyer: React.SFC<ViewFlyerProps> = ({
    flyer
}) => {
    return ( 
        <div>
            <h2>View Flyer</h2>
            <p>{JSON.stringify(flyer.selectedFlyer)}</p>
        </div>
     );
}

const mapStateToProps = (state:StoreState) => ({
    flyer: state.flyer
})
 
export default connect(mapStateToProps)(ViewFlyer);