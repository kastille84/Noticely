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
import {Link} from 'react-router-dom';

import SignIn from '../SignIn';
import Register from '../Register';

import StyledNavigation from './styled';
// types
import user, {IUser} from '../../redux/reducers/user';
import {StoreState} from '../../redux/root-reducer';

import {logoutUser} from "../../redux/actions";

export interface NavigationProps {
  user: IUser,
  logoutUser: Function
}
 
const Navigation: React.SFC<NavigationProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalType, setModalType] = useState('signin');// can also be 'register'

  const toggleCollapse = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

  const isLoggedIn = ():boolean => {
    return Object.keys(props.user.currentUser).length>0;
  }

  return ( 
    <StyledNavigation>
      <Navbar light expand="md">
        <NavbarBrand tag={Link} to="/">Noticely</NavbarBrand>
        {/* <NavbarBrand href="/"><img src={require("../../Logo.png")} /></NavbarBrand> */}
        <NavbarToggler onClick={toggleCollapse} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">Home</NavLink>
              </NavItem>
            {isLoggedIn() &&
              <NavItem>
                <NavLink tag={Link} to="/manage">Manage</NavLink>
              </NavItem>            
            }
          </Nav>
          <NavbarText>
            {isLoggedIn()? (
              <React.Fragment>
                <Button color="primary" onClick={()=>props.logoutUser()}>Logout</Button>
              </React.Fragment>
            )
              :
              <Button color="primary" onClick={()=>toggleModal()}>Sign In</Button>
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

export default connect(mapStateToProps ,{
  logoutUser
})(Navigation);