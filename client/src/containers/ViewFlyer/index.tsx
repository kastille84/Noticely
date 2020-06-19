import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import moment from 'moment';

import { StoreState } from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import ViewFlyerStyled from './styled';
import PhotoView from '../../components/PhotoView';

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

    const determineUserOrAnonymous = () => {
        if(selectedFlyer.user) {
            return selectedFlyer.user.name;
        } else {
            return "Anonymous"
        }
    }

    return ( 
        <ViewFlyerStyled>
            <h2>Flyer Notification</h2>
            <div className="flyer-page">
                <h3>{selectedFlyer.heading}</h3>
                <hr />
    <cite className="text-muted">Posted by: {determineUserOrAnonymous()} on {moment.unix(selectedFlyer.createdAt/1000).format("MM/DD/YY")}</cite>
                {/* Images Logic goes here */}
                <PhotoView images={selectedFlyer.images||[]} editable={false}/>
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