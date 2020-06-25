import React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {ButtonToolbar, Button} from 'reactstrap';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';
import {faTimes, faEdit} from '@fortawesome/free-solid-svg-icons';

import FlyerListItemStyle from './styled/index';
import { IFlyer } from '../../redux/reducers/flyer';
import { setSelectedFlyer, setWishToDeleteFlyer } from '../../redux/actions';

import {limitText} from '../../utils/functions';

export interface FlyerListItemProps extends RouteComponentProps {
    flyer: any,
    belongsToUser: boolean,
    setSelectedFlyer: any,
    setWishToDeleteFlyer: any,
    history: any
}
 
const FlyerListItem: React.SFC<FlyerListItemProps> = ({
    flyer,
    belongsToUser,
    setSelectedFlyer,
    setWishToDeleteFlyer,
    history
}) => {

    const handleClick = () => {
        // set selected flyer
        setSelectedFlyer(flyer)
        // redirect to flyer view
        history.push('/view-flyer');
    }

    const handleDelete = () => {
        // set selected flyer
        setSelectedFlyer(flyer);
        setWishToDeleteFlyer(true)
    }

    return ( 
        <FlyerListItemStyle>
            <div className={`flyer-list-item-wrapper ${belongsToUser?"belongsToUser":""}`} onClick={handleClick} >
                <h3>{flyer.heading}</h3>
                <p>{limitText(flyer.description, 49)}</p>
                {belongsToUser && (
                <React.Fragment>
                    <hr/>
                    <ButtonToolbar className="flyer-controls">
                        <Button
                            color="warning"
                            size="sm"
                            
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={(e)=>{
                                e.stopPropagation();
                                handleDelete();
                            } }
                        >
                            {" "}<FontAwesomeIcon icon={faTimes} />{" "}
                        </Button>
                    </ButtonToolbar>
                </React.Fragment>
                )}
            </div>
        </FlyerListItemStyle>
    );
}
 
export default connect( null,{
    setSelectedFlyer,
    setWishToDeleteFlyer
})(withRouter(FlyerListItem));