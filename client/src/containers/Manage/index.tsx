import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';

import ManageStyled from './styled';
import { StoreState } from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import {getFlyersByUser} from '../../redux/actions'
import { IUser } from '../../redux/reducers/user';
import { IsEmptyObj, limitText } from '../../utils/functions';
import { Spinner } from 'reactstrap';

export interface ManageProps extends RouteComponentProps {
    flyer: any,
    user: IUser,
    getFlyersByUser: any
}
 
const Manage: React.SFC<ManageProps> = ({
    flyer,
    user,
    history,
    getFlyersByUser
}) => {
    useEffect(()=> {
        //if not signed it, redirect to home
        if(IsEmptyObj(user.currentUser)) {
            console.log("isEmpty",IsEmptyObj(user.currentUser), "currentUser", user.currentUser )
            history.push("/");
            return;
        }
        //get flyers by user
        getFlyersByUser(user.currentUser._id)
    }, []);

    const displayListByLocation = () => {
        const arrayOfPlaceId:any = [];
        for(let flyerItem of flyer.flyers) {
            if(!arrayOfPlaceId.includes(flyerItem.placeId.place_id)) {
                arrayOfPlaceId.push(flyerItem.placeId.place_id)
            }
        }
        const arrayOfPlacesWithAssociatedFlyers:any = [];
        for(let placeItem of arrayOfPlaceId) {
            const tempArr = [];
            for(let flyerItem of flyer.flyers) {
                if(placeItem === flyerItem.placeId.place_id) {
                    tempArr.push(flyerItem)
                }
            }
            arrayOfPlacesWithAssociatedFlyers.push(tempArr)
        }
        console.log("arrayOfPlacesWithAssociatedFlyers",arrayOfPlacesWithAssociatedFlyers);

        return (
            <div className="manage-list">
                <div className="manage-list__container">
                    {arrayOfPlacesWithAssociatedFlyers.map((item:any, idx:number) => (
                        <div className="manage-list__item" key={idx}>
                            <div className="manage-list__item__header">
                                <h5>{limitText(item[0].placeId.name, 17)}</h5>
                            </div>
                            <div className="manage-list__item__body">
                                <cite>{item[0].placeId.formattedAddress}</cite>
                                <hr/>
                                <p>{item.length} flyer notice(s)</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return ( 
        <ManageStyled>
            <h2>Manage Flyers</h2>
            <hr />
            {flyer.fetchingflyers && <div><Spinner color="dark" size="sm" /></div>}
            {!flyer.fetchingflyers && flyer.flyers && flyer.flyers.length > 0?
                displayListByLocation()
                :
                <p>There are no flyers to manage yet. You must create a flyer first.</p>
            }

        </ManageStyled>
     );
}

const mapStateToProps = (state:StoreState) => ({
    flyer: state.flyer,
    user: state.user
});

export default connect(mapStateToProps, {
    getFlyersByUser
})(Manage);