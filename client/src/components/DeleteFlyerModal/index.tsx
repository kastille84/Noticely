import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import {connect} from 'react-redux';
import {withRouter, RouteComponentProps } from 'react-router-dom';

import { StoreState } from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import {deleteFlyer} from '../../redux/actions';
import { RouterProps } from 'react-router';

export interface DeleteFlyerModalProps extends RouteComponentProps {
    modal: boolean,
    toggleModal: any,
    flyer: IFlyer,
    deleteFlyer: any,
    manageMode?: boolean
}
 
const DeleteFlyerModal: React.SFC<DeleteFlyerModalProps> = ({
    modal,
    toggleModal,
    flyer,
    deleteFlyer,
    history
}) => {

    const renderErrors = () => {
        if(flyer.errors) {
            return flyer.errors.map((error:any, idx:number) => {
            return <p key={idx} className="text-danger">{error.message}</p>
            })
        }
    }

    return ( 
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalBody>
                <p>Are you sure you want to delete this flyer?</p>
                {flyer.errors && renderErrors()}
            </ModalBody>
            <ModalFooter>
                <Button 
                    color="primary" 
                    onClick={()=> {
                        deleteFlyer(flyer.selectedFlyer, history.push);
                    }}
                >Yes</Button>{' '}
                <Button color="secondary" onClick={()=>toggleModal(false)}>No</Button>
            </ModalFooter>
        </Modal>
     );
}

const mapStateToProps = (state: StoreState) => ({
    flyer: state.flyer
});

export default connect(mapStateToProps, {
    deleteFlyer
})(withRouter(DeleteFlyerModal));