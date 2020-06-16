import React from 'react';

import FlyerListItemStyle from './styled/index';
import { IFlyer } from '../../redux/reducers/flyer';

export interface FlyerListItemProps {
    flyer: any
}
 
const FlyerListItem: React.SFC<FlyerListItemProps> = ({
    flyer
}) => {
    return ( 
        <FlyerListItemStyle>
            <div className="flyer-list-item-wrapper" >
                <h3>{flyer.heading}</h3>
                <p>{flyer.description}</p>
            </div>
        </FlyerListItemStyle>
    );
}
 
export default FlyerListItem;