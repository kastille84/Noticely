import React, { useState, useEffect, FormEvent } from "react";
import {connect} from 'react-redux';
import { Modal, ModalBody, Input, Label, Button } from "reactstrap";

import { FormWrapper, InputGroup } from "../Register/styled";
import { validateEmail } from "../../utils/validate";

//import {loginUser} from '../../redux/actions';
import {StoreState} from '../../redux/root-reducer';

export interface SignInProps {
  modal: boolean,
  toggleModal: any,
  changeModalType: any,
  user: any
}
export interface ILoginErrors {
  [key: string]: any;
}
 
const SignIn: React.SFC<SignInProps> = ({
  modal,
  toggleModal,
  changeModalType,
  user
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const errorsObj: any = { ...errors };
    e.preventDefault();
    errorsObj.email = validateEmail(email);

    //set the state's errors object
    setErrors(errorsObj);
    //check if any errors exist, don't submit form if errors
    for (let errorItem in errorsObj) {
      if (errorsObj[errorItem] !== "") {
        return;
      }
    }
    // at this point it passed validation, 
    // set loading state true
    // make graphQL call
    //LoginUser( email, password);
    // check connected state of user, if no error then close off the modal
    
  };

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
        <h3 className="text-center">Login</h3>
        <FormWrapper>
          {renderErrors()}
          <form onSubmit={handleSubmit}>
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
            <Button color="primary" type="submit" block>
              SignIn
            </Button>
          </form>
        </FormWrapper>
        <div className="switch-form text-center">
          <p>
            Don't have an account?{" "}
            <span onClick={() => changeModalType("register")}>Register</span>
          </p>
        </div>
      </ModalBody>
    </Modal>
  );
}

const mapStateToProps = (state: StoreState) => ({
  user: state.user
});

export default connect(mapStateToProps)(SignIn);