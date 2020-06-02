import * as React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

export interface SignInProps {
  modal: boolean,
  toggleModal: any,
  changeModalType: any
}
 
let SignIn = (props: SignInProps) => {
  return (  
    <Modal isOpen={props.modal} toggle={props.toggleModal} className="sign-in-modal">
      <ModalBody>
        <p>Signin</p>

        <p onClick={()=>props.changeModalType("register")}>Change to Register</p>
      </ModalBody>
    </Modal>
  );
}

export default SignIn;