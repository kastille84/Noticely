import React, { useState, useEffect, FormEvent } from "react";
import {connect} from 'react-redux';
import { Modal, ModalBody, Input, Label, Button } from "reactstrap";

import { FormWrapper, InputGroup } from "./styled";
import { validateEmail, validateConfirmPassword } from "../../utils/validate";

import {registerUser} from '../../redux/actions';
import {StoreState} from '../../redux/root-reducer';

export interface RegisterProps {
  modal: boolean;
  toggleModal: any;
  changeModalType: any;
  registerUser: Function;
  user: any;
}
export interface IRegisterErrors {
  [key: string]: any;
}

const Register: React.SFC<RegisterProps> = ({
  modal,
  toggleModal,
  changeModalType,
  registerUser,
  user
}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const errorsObj: any = { ...errors };
    e.preventDefault();
    errorsObj.email = validateEmail(email);
    errorsObj.confirmPassword = validateConfirmPassword(
      password,
      confirmPassword
    );
    //set the state's errors object
    setErrors(errorsObj);
    //check if any errors exist, don't submit form if errors
    for (let errorItem in errorsObj) {
      console.log("errorItem", errorItem)
      if (errorsObj[errorItem] !== "") {
        return;
      }
    }
    // at this point it passed validation, 
    // set loading state true
    // make graphQL call
    registerUser(fullName, email, password);
    
  };

  useEffect(()=> {
    //#Todo - If user.registering is true -> show a loader
    if(user.registering ===false && Object.keys(user.currentUser).length>0 && modal===true) {
      //close modal
      toggleModal();
    }
  }, [user])

  const renderErrors = () => {
    if(user.errors) {
      return user.errors.map((error:any) => {
        return <p className="text-danger">{error.message}</p>
      })
    }
  }

  return (
    <Modal isOpen={modal} toggle={toggleModal} className="sign-in-modal">
      <ModalBody>
        <h3 className="text-center">Register</h3>
        <FormWrapper>
          {renderErrors()}
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <Label for="full_name">Name</Label>
              <Input
                type="text"
                name="full_name"
                placeholder="Joe Smith"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              {errors.email && <p className="text-danger">{errors.email}</p>}
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
            <InputGroup>
              <Label for="password">Password</Label>
              <div className="password-container">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  maxLength={20}
                  required
                />
                <span 
                  className="password-container__show"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
            </InputGroup>
            <InputGroup>
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}
              <Label for="confirm_password">Confirm Password</Label>
              <Input
                type={showPassword ? "text" : "password"}
                name="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                maxLength={20}
                required
              />
            </InputGroup>
            <Button color="primary" type="submit" block>
              Register
            </Button>
          </form>
        </FormWrapper>
        <div className="switch-form text-center">
          <p>
            Already have an account?{" "}
            <span onClick={() => changeModalType("signin")}>Signin</span>
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (state: StoreState) => ({
  user: state.user
})

export default connect(
  mapStateToProps, 
  {registerUser}
)(Register);
