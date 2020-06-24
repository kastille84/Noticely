import React from 'react';
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

export interface DeleteFlyerModalProps {
    modal: boolean,
    toggleModal: any,
}
 
const DeleteFlyerModal: React.SFC<DeleteFlyerModalProps> = ({
    modal,
    toggleModal,
}) => {
    return ( 
        <Modal isOpen={modal} toggle={toggleModal}>
            <ModalBody>
                <p>Are you sure you want to delete this flyer?</p>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleModal}>Yes</Button>{' '}
                <Button color="secondary" onClick={()=>toggleModal(false)}>No</Button>
            </ModalFooter>
        </Modal>
     );
}
 
export default DeleteFlyerModal;