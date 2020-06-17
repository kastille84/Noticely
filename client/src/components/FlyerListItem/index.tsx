import React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {connect} from 'react-redux';

import FlyerListItemStyle from './styled/index';
import { IFlyer } from '../../redux/reducers/flyer';
import { setSelectedFlyer } from '../../redux/actions';

export interface FlyerListItemProps extends RouteComponentProps {
    flyer: any,
    setSelectedFlyer: any,
    history: any
}
 
const FlyerListItem: React.SFC<FlyerListItemProps> = ({
    flyer,
    setSelectedFlyer,
    history
}) => {

    const handleClick = () => {
        // set selected flyer
        setSelectedFlyer(flyer)
        // redirect to flyer view
        history.push('/view-flyer');
    }

    return ( 
        <FlyerListItemStyle>
            <div className="flyer-list-item-wrapper" onClick={handleClick} >
                <h3>{flyer.heading}</h3>
                <p>{flyer.description}</p>
            </div>
        </FlyerListItemStyle>
    );
}
 
export default connect( null,{
    setSelectedFlyer
})(withRouter(FlyerListItem));