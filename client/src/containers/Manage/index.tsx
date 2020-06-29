import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';

import ManageStyled from './styled';
import { StoreState } from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import {getFlyersByUser, setOpenFlyerPane ,setSelectedPlace, setDeletedFlyer ,setFlyersInit} from '../../redux/actions'
import { IUser } from '../../redux/reducers/user';
import { IsEmptyObj, limitText } from '../../utils/functions';
import { Spinner } from 'reactstrap';
import FlyerListSlidePane from '../../components/FlyerListSlidePane';
import FlyerListItem from '../../components/FlyerListItem';

export interface ManageProps extends RouteComponentProps {
    flyer: any,
    user: IUser,
    getFlyersByUser: any,
    setOpenFlyerPane: any,
    setSelectedPlace: any,
    setDeletedFlyer: any,
    setFlyersInit: any
}
 
const Manage: React.SFC<ManageProps> = ({
    flyer,
    user,
    history,
    getFlyersByUser,
    setOpenFlyerPane,
    setSelectedPlace,
    setDeletedFlyer,
    setFlyersInit
}) => {
    const [selectedLocationItem, setSelectedLocationItem] = useState([]);
    useEffect(()=> {
        setFlyersInit([]);
        //if not signed it, redirect to home
        if(IsEmptyObj(user.currentUser)) {
            history.push("/");
            return;
        }
        //get flyers by user
        getFlyersByUser(user.currentUser._id);
        // flyerpane closed by default
        setOpenFlyerPane(false);

        return () => {
            // setDeletedFlyer to false
            setDeletedFlyer({})
        }
    }, []);

    useEffect(()=> {
        //get flyers by user
        getFlyersByUser(user.currentUser._id);
    },[flyer.deletedFlyer])

    const handleItemClick = (item:any) => {
        setOpenFlyerPane(true);
        setSelectedPlace(item[0].placeId)
        setSelectedLocationItem(item);
    }

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

        return (
            <div className="manage-list">
                <div className="manage-list__container">
                    {arrayOfPlacesWithAssociatedFlyers.map((item:any, idx:number) => (
                        <div className="manage-list__item" key={idx} onClick={()=>handleItemClick(item)}>
                            <div className="manage-list__item__header">
                                <h5>{typeof item[0].placeId !== 'string' && limitText(item[0].placeId.name, 17)}</h5>
                            </div>
                            <div className="manage-list__item__body">
                                <cite>{typeof item[0].placeId !== 'string' && item[0].placeId.formattedAddress}</cite>
                                <hr/>
                                <p>{item.length} flyer notice(s)</p>
                            </div>
                        </div>
                    ))}
                </div>
                <FlyerListSlidePane manageMode>
                    {selectedLocationItem.map((flyerItem:any,idx:number)=> (
                        <FlyerListItem flyer={flyerItem} belongsToUser={true} key={idx}/>
                    ))}
                    {selectedLocationItem.length===0 &&
                        <p>No Flyers at this location </p>
                    }
                </FlyerListSlidePane>
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
    getFlyersByUser,
    setOpenFlyerPane,
    setSelectedPlace,
    setDeletedFlyer,
    setFlyersInit
})(Manage);