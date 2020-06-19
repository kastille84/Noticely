import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';

import { StoreState } from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import ViewFlyerStyled from './styled';

export interface ViewFlyerProps extends RouteComponentProps {
    flyer: IFlyer
}
 
const ViewFlyer: React.SFC<ViewFlyerProps> = ({
    flyer,
    history
}) => {
    let {selectedFlyer} = flyer;
    selectedFlyer = selectedFlyer || {};
    useEffect(()=> {
        if(Object.keys(selectedFlyer).length ===0) {
            history.push("/")
        }
    },[]);

    return ( 
        <ViewFlyerStyled>
            <h2>Flyer Notification</h2>
            <div className="flyer-page">
                <h3>{selectedFlyer.heading}</h3>
                <hr />
                {/* Images Logic goes here */}
                <div className="flyer-page__body">
                    {selectedFlyer.description}
                </div>
            </div>
        </ViewFlyerStyled>
     );
}

const mapStateToProps = (state:StoreState) => ({
    flyer: state.flyer
})
 
export default connect(mapStateToProps)(ViewFlyer);