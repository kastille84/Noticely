import React, {useState, FormEvent} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Label, Input, Button} from 'reactstrap';

import { FormWrapper, InputGroup } from "../../components/Register/styled";
import agent from '../../agent';

import { StoreState} from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import { ILocation } from '../../redux/reducers/location';
import { IUser } from '../../redux/reducers/user';
import {validateImage} from '../../utils/validate';

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
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [description, setDescription] = useState("");
    // email
    const [email, setEmail] = useState("")
    const [selectedEmail, setSelectedEmail] = useState("");
    // phone
    const [phoneSelected, setPhoneSelected] = useState("");
    const [phone, setPhone] = useState("");
    // errors
    const [errors, setErrors] = useState({
        heading: "",
        description: "",
        email: "",
        imgNum:"",
        img1: "",
        img2: "",
        phone: ""
    });

    const isUserLoggedIn = ():boolean => {
        return Object.keys(user.currentUser).length > 0;
    }

    const fileChanged = (e:React.ChangeEvent<HTMLInputElement>) => {
        console.dir(e.target.value)
        if(imgNum===0) {
            // reset error
            setErrors({...errors, img1:""});
            //add first pic
            if(validateImage(e.target.value)) {
                setImgNum(1)
                //get Signed
                if(e.target.files !==null) {
                    const file = e.target.files[0];
                    getSignedRequest(file);
                }
            } else {setErrors({...errors, img1:"Wrong File Type"})}
        }else if (imgNum===1) {
             // reset error
             setErrors({...errors, img2:""});
            //add second pic
            if(validateImage(e.target.value)) {
                setImgNum(2)
                //get Signed
                if(e.target.files !==null) {
                    const file = e.target.files[0];
                    getSignedRequest(file);
                }
            }else {setErrors({...errors, img2:"Wrong File Type"})}
        } else {
            //set error 'max of 2 images'
            setErrors({...errors, imgNum:"Max of 2 images"})
        }
        // if(document && document.getElementById('flyerImg') && document.getElementById('flyerImg').value) {
        //     document.getElementById('flyerImg').value = '';
        // }
    }
    const getSignedRequest = async (file:any) => {
        try {
            const response = await axios.post('/graphql', 
                JSON.stringify({
                    query: `
                        query {
                            signS3(s3Input: {fileName: "${file.name}", fileType: "${file.type}"}) {
                                signedRequest,
                                url
                            } 
                        }
                    `
                })
            )
            const {data: {data: {signS3}}} = response;
            uploadFile(file, signS3.signedRequest, signS3.url);
        } catch(error) {
            console.log(error)
        }
    }
    const uploadFile = async (file:any, signedRequest:any, url:string) => {
        try {
            // delete Authorization header
            delete axios.defaults.headers.common["Authorization"];

            // make aws call
            const response = axios({
                method: 'put',
                url: signedRequest,
                data: file,
                headers: {'Content-Type': file.type}
            })            

            // store the image urls in state to be sent to the backend
            if (imgNum === 0) {                    
                setImg1(url);
            } else if (imgNum === 1) {
                setImg2(url);
            }

            // add auth header back
            agent.setSession(user.currentUser.token);
        } catch(error) {
            console.dir("error", error)
        }
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        console.log("here")
        e.preventDefault()
        // validation
        const errorsObj: any = { ...errors };
        errorsObj.heading= heading.trim().length > 100? 'Heading must not be more than 100 characters':"";
        errorsObj.description = description.trim().length < 3? "Heading must be more than 3 characters": "";
        errorsObj.description = description.trim().length > 2000? "Body must not be more than 2000 characters": "";
        errorsObj.description = description.trim().length < 3? "Body must be more than 3 characters": "";
        errorsObj.phone = (phoneSelected && phone.trim().length > 30)? "Phone must be less than 30 characters": "";
        errorsObj.phone = (/[0-9]/.test(phone))? "": "Phone must be all numbers";

        setErrors(errorsObj);
        console.log(errorsObj)
        // check if any errors exist, don't submit form if errors
        for (let errorItem in errorsObj) {
            if (errorsObj[errorItem] !== "") {
            return;
            }
        }

        //construct flyer body to be sent
        const flyerBody = {
            userId: user.currentUser._id,
        }
    }

    // const renderErrors = () => {
    //     if(user.errors) {
    //       return user.errors.map((error:any) => {
    //         return <p className="text-danger">{error.message}</p>
    //       })
    //     }
    // }

    return (
        <div>
            <h2>Make Your Flyer</h2>
            <p>at {(reduxLocation.selectedPlace||{}).name}</p>
            <FormWrapper>
                {/* {renderErrors()} */}
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        {errors.heading && <p className="text-danger">{errors.heading}</p>}                 
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
                                    id="flyerImg"
                                    onChange={(e)=>fileChanged(e)}
                                />
                            </InputGroup>
                        </React.Fragment>                        
                    )}
                    <InputGroup>
                        {errors.description && <p className="text-danger">{errors.description}</p>}
                        <Label for="description">Body</Label>
                        <Input 
                            type="textarea" 
                            name="description" 
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        />
                    </InputGroup>
                    {isUserLoggedIn()? (
                        <React.Fragment>
                            <InputGroup>
                                <Label for="img">Ways to Contact You</Label>
                                <section className="d-flex">
                                    <div>
                                        <Input 
                                            type="checkbox" 
                                            value="email" 
                                            onChange={(e)=>setSelectedEmail(selectedEmail==""?e.target.value:"")}
                                        />{" "}Email
                                    </div>
                                    <div>
                                        <Input 
                                            type="checkbox" 
                                            value="addPhone" 
                                            onChange={(e)=>setPhoneSelected(phoneSelected==""?e.target.value:"")}
                                        />{" "} Phone
                                    </div>
                                </section>
                            </InputGroup>
                            {phoneSelected && 
                                <InputGroup>
                                    <Label for="phone">Phone</Label>
                                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                                    <Input 
                                        type="tel" 
                                        name="phone"
                                        onChange={(e)=>setPhone(e.target.value)}
                                    />                            
                                </InputGroup>                            
                            }
                            {selectedEmail &&
                                <InputGroup>
                                    <Label for="email">Email</Label>
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                    <Input 
                                        type="email" 
                                        name="email"
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />                            
                                </InputGroup>
                            }
                        </React.Fragment>                        
                    )
                    :
                    <p>Anonymous users must put their contact info in the body. Signup to have more options for your flyers.</p>
                    }
                    <Button 
                        type="submit"
                        color='primary'
                        outline={false}
                    >Make Flyer</Button>
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
