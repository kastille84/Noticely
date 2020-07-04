import React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {ButtonToolbar, Button} from 'reactstrap';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {faTimes, faEdit} from '@fortawesome/free-solid-svg-icons';

import FlyerListItemStyle from './styled/index';
import { IFlyer } from '../../redux/reducers/flyer';
import { setSelectedFlyer} from '../../redux/actions';

import {limitText} from '../../utils/functions';

export interface FlyerListItemForTemplateProps extends RouteComponentProps {
    flyer: any,
    belongsToUser: boolean,
    setSelectedFlyer: any,
    history: any
}
 
const FlyerListItemForTemplate: React.SFC<FlyerListItemForTemplateProps> = ({
    flyer,
    belongsToUser,
    setSelectedFlyer,
    history
}) => {

    const handleClick = () => {
        console.log("reach here")
        // set selected flyer
        setSelectedFlyer(flyer)
        // redirect to flyer view
        history.push('/make-from-template');
    }

    return ( 
        <FlyerListItemStyle>
            <div className={`flyer-list-item-wrapper ${belongsToUser?"belongsToUser":""}`} onClick={handleClick} >
                <h3>{flyer.heading}</h3>
                <p>{limitText(flyer.description, 49)}</p>
            </div>
        </FlyerListItemStyle>
    );
}
 
export default connect( null,{
    setSelectedFlyer
})(withRouter(FlyerListItemForTemplate));