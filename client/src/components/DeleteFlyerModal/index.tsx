import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
import {connect} from 'react-redux';

import { StoreState } from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import {deleteFlyer} from '../../redux/actions';

export interface DeleteFlyerModalProps {
    modal: boolean,
    toggleModal: any,
    flyer: IFlyer,
    deleteFlyer: any
}
 
const DeleteFlyerModal: React.SFC<DeleteFlyerModalProps> = ({
    modal,
    toggleModal,
    flyer,
    deleteFlyer
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
                        deleteFlyer(flyer.selectedFlyer);
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
})(DeleteFlyerModal);