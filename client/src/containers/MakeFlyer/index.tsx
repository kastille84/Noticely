import React, {useState, FormEvent} from 'react';
import {connect} from 'react-redux';
import {Label, Input} from 'reactstrap';

import { FormWrapper, InputGroup } from "../../components/Register/styled";

import { StoreState} from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import { ILocation } from '../../redux/reducers/location';
import { IUser } from '../../redux/reducers/user';

export interface MakeFlyerProps {
    reduxLocation: ILocation,
    flyer: IFlyer,
    user: IUser
}

const MakeFlyer:React.SFC<MakeFlyerProps> = ({
    reduxLocation,
    flyer,
    user
}) => {
    // useState
    const [heading, setHeading] = useState("");
    // img 
    const [imgNum, setImgNum] = useState(0);
    const [img1, setImg1] = useState(null);
    const [img2, setImg2] = useState(null);
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState(false)
    // phone
    const [phoneSelected, setPhoneSelected] = useState(false);
    const [phone, setPhone] = useState("");
    // errors
    const [errors, setErrors] = useState({
        heading: "",
        body: "",
        email: "",
        img1: "",
        img2: "",
        phone: ""
    });

    const isUserLoggedIn = ():boolean => {
        return Object.keys(user.currentUser).length > 0;
    }

    const fileChanged = (e:FormEvent<HTMLInputElement>) => {

    }

    return (
        <div>
            <h2>Make Your Flyer</h2>
            <p>at {(reduxLocation.selectedPlace||{}).name}</p>
            <FormWrapper>
                <form >
                    <InputGroup>
                        <Label for="heading">Flyer Heading</Label>
                        <Input 
                            type="text" 
                            name="heading" 
                            onChange={(e)=>setHeading(e.target.value)}
                            required
                        />
                    </InputGroup>
                    {isUserLoggedIn() &&(
                        <React.Fragment>
                            <p>Num of Pics Uploaded: {imgNum}/2</p>
                            <InputGroup>
                                <Label for="img">Upload Image</Label>
                                <Input 
                                    type="file" 
                                    name="img" 
                                    onChange={(e)=>fileChanged(e)}
                                />
                            </InputGroup>
                        </React.Fragment>                        
                    )}
                    <InputGroup>
                        <Label for="description">Body</Label>
                        <Input 
                            type="textarea" 
                            name="description" 
                            onChange={(e)=>setHeading(e.target.value)}
                            required
                        />
                    </InputGroup>
                    {isUserLoggedIn()? (
                        <React.Fragment>
                            <InputGroup>
                                <Label for="img">Ways to Contact You</Label>
                                <Input 
                                    type="checkbox" 
                                    name="email" 
                                    onChange={(e)=>fileChanged(e)}
                                />{" "}Email
                                <Input 
                                    type="checkbox" 
                                    name="addPhone" 
                                    onChange={(e)=>setPhoneSelected(true)}
                                />{" "} Phone
                                <Input 
                                    type="tel" 
                                    name="phone"
                                    onChange={(e)=>setPhone(e.target.value)}
                                />
                            </InputGroup>
                        </React.Fragment>                        
                    )
                    :
                    <p>Anonymous users must put their contact info in the body. Signup to have more options for your flyers.</p>
                    }
                </form>
            </FormWrapper>
        </div>
    )
}

const mapStateToProps = (state: StoreState) => ({
    reduxLocation: state.location,
    flyer: state.flyer,
    user: state.user
  });

export default connect(mapStateToProps, {

})(MakeFlyer);
