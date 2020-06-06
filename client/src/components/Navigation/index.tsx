import React, {useState} from 'react';
import {connect} from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button
} from 'reactstrap';

import SignIn from '../SignIn';
import Register from '../Register';

import StyledNavigation from './styled';
// types
import {IUser} from '../../redux/reducers/user';
import {StoreState} from '../../redux/root-reducer';

export interface NavigationProps {
  user: IUser
}
 
const Navigation: React.SFC<NavigationProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('signin');// can also be 'register'

  const toggleCollapse = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  return ( 
    <StyledNavigation>
      <Navbar light expand="md">
        <NavbarBrand href="/">Noticely</NavbarBrand>
        {/* <NavbarBrand href="/"><img src={require("../../Logo.png")} /></NavbarBrand> */}
        <NavbarToggler onClick={toggleCollapse} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Manage</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>
            {Object.keys(props.user.currentUser).length===0? 
              <Button color="primary" onClick={toggleModal}>Sign In</Button>
              :
              <Button color="primary" >Logout</Button>
            }
            {modalType==='signin'? 
              <SignIn modal={modal} toggleModal={toggleModal} changeModalType={setModalType} /> 
              :
              <Register modal={modal} toggleModal={toggleModal} changeModalType={setModalType} />
            }
          </NavbarText>
        </Collapse>
      </Navbar>
    </StyledNavigation>
   );
}

const mapStateToProps = (state:StoreState) => ({
  user: state.user
});

export default connect(mapStateToProps)(Navigation);