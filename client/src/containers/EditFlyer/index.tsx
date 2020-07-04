import React, {useState, useEffect, FormEvent} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Label, Input, Button, Spinner} from 'reactstrap';

import { FormWrapper, InputGroup, CheckBoxContainer } from "../../components/Form/styled";
import agent from '../../agent';

import { StoreState} from '../../redux/root-reducer';
import { IFlyer } from '../../redux/reducers/flyer';
import { ILocation } from '../../redux/reducers/location';
import { IUser } from '../../redux/reducers/user';
import {validateImage, validateEmail} from '../../utils/validate';


import {editFlyer, setOpenFlyerPane} from '../../redux/actions';
import { RouteComponentProps } from 'react-router';
import { IsEmptyObj } from '../../utils/functions';
import { EditFlyerStyle } from './styled';

export interface EditFlyerProps extends RouteComponentProps {
    reduxLocation: ILocation,
    flyer: IFlyer,
    user: IUser,
    editFlyer: any,
    setOpenFlyerPane: any
}

const EditFlyer:React.SFC<EditFlyerProps> = ({
    reduxLocation,
    flyer,
    user,
    editFlyer,
    history,
    setOpenFlyerPane
}) => {
    // useState
    const [heading, setHeading] = useState(((flyer.selectedFlyer||{}).heading)||"");
    // img 
    const [imgNum, setImgNum] = useState(((flyer.selectedFlyer||{}).images||[]).length);
    const [img1, setImg1] = useState(((flyer.selectedFlyer||{}).images || []).length > 0 ?flyer.selectedFlyer.images[0]:"");
    const [img2, setImg2] = useState(((flyer.selectedFlyer||{}).images || []).length > 1 ?flyer.selectedFlyer.images[1]:"");
    const [description, setDescription] = useState(((flyer.selectedFlyer||{}).description)||"");
    // email
    const [email, setEmail] = useState(((flyer.selectedFlyer||{}).contact||{}).email? flyer.selectedFlyer.contact.email:"")
    const [selectedEmail, setSelectedEmail] = useState(((flyer.selectedFlyer||{}).contact||{}).email? "email":"");
    // phone
    const [phone, setPhone] = useState(((flyer.selectedFlyer||{}).contact||{}).phone? flyer.selectedFlyer.contact.phone:"");
    const [phoneSelected, setPhoneSelected] = useState(((flyer.selectedFlyer||{}).contact||{}).phone? "phone":"");
    const [template, setTemplate] = useState((flyer.selectedFlyer||{}).template === "template"? "template":"")
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
            setErrors({...errors, imgNum:"Max of 2 images. This current image was not uploaded."})
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
        //reset error 'max of 2 images'
        setErrors({...errors, imgNum:""})
        e.preventDefault()
        // validation
        const errorsObj: any = { ...errors };
        errorsObj.heading= heading.trim().length > 100? 'Heading must not be more than 100 characters':"";
        errorsObj.description = description.trim().length < 3? "Heading must be more than 3 characters": "";
        errorsObj.description = description.trim().length > 2000? "Body must not be more than 2000 characters": "";
        errorsObj.description = description.trim().length < 3? "Body must be more than 3 characters": "";
        errorsObj.phone = (phoneSelected && phone.trim().length > 30)? "Phone must be less than 30 characters": "";
        errorsObj.phone = phoneSelected && !(/[0-9]/.test(phone)) && "Phone must be all numbers";
        errorsObj.email = selectedEmail && validateEmail(email)==="Not a Valid Email" && "Email is invalid";

        setErrors(errorsObj);
        // check if any errors exist, don't submit form if errors
        for (let errorItem in errorsObj) {
            if(typeof errorsObj[errorItem] === "boolean" && errorsObj[errorItem] === true) {
                return;
            }
            if(typeof errorsObj[errorItem] === "string" && errorsObj[errorItem].length >0) {
                return;
            }
        }

        // construct flyer body to be sent
        const images = [];
        if(img1) {
            images.push(img1)
        }
        if(img2) {
            images.push(img2)
        }
        const flyerBody = {
            _id: flyer.selectedFlyer._id,
            placeId: reduxLocation.selectedPlace.placeId,
            formattedAddress: reduxLocation.selectedPlace.formatted_address,
            latlng: reduxLocation.selectedPlace.latlng,
            name: reduxLocation.selectedPlace.name,
            images: images,
            heading: heading,
            description: description,
            phone: phoneSelected? phone:"",
            email: selectedEmail? email: "",
            template: template
        }

        // async action to make API call to make-flyer
        editFlyer(flyerBody, ()=>history.push("/view-flyer"));
    }

    const handleDeletePic = (img: string, index:number) => {
      if(index===1) {
        setImg1(img2)
        setImg2("")
      } else if (index === 2) {
        setImg2("")        
      }
      let newImgNum = imgNum -1;
      setImgNum(newImgNum);
    }

    const renderErrors = () => {
        if(flyer.errors) {
          return flyer.errors.map((error:any) => {
            return <p className="text-danger">{error.message}</p>
          })
        }
    }

    useEffect(()=> {
        if(IsEmptyObj(flyer.selectedFlyer)) {
            history.push("/")
        }

        return () => {
            setOpenFlyerPane(false)
        }
    },[])

    return !flyer.selectedFlyer? null : (            
        <EditFlyerStyle>
            <h2>Edit Your Flyer</h2>
            <h5>{(reduxLocation.selectedPlace||{}).name}</h5>
            <hr />
            <FormWrapper>
                {renderErrors()}
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        {errors.heading && <p className="text-danger">{errors.heading}</p>}                 
                        <Label for="heading">Flyer Heading</Label>
                        <Input 
                            type="text" 
                            name="heading" 
                            value={heading}
                            onChange={(e)=>setHeading(e.target.value)}
                            required
                        />
                    </InputGroup>
                    {isUserLoggedIn() &&(
                        <React.Fragment>
                            <p>Num of Pics Uploaded: {imgNum}/2</p>
                            <div className="edit-pics">
                                {img1 !=="" && (
                                <div className="edit-pics__item">
                                    <p className="edit-pics__item__controls">
                                    <span onClick={()=>handleDeletePic(img1, 1)}>X</span>
                                    </p>
                                    <figure>
                                        <img src={img1} />
                                    </figure>                                        
                                </div>
                                )}
                                {img2 !== "" && (
                                <div className="edit-pics__item">
                                    <p className="edit-pics__item__controls">
                                    <span onClick={()=>handleDeletePic(img2, 2)}>X</span>
                                    </p>
                                    <figure>
                                        <img src={img2} />
                                    </figure>                                        
                                </div>
                                )}
                            </div>
                            <InputGroup>
                                {errors.imgNum && <p className="text-danger">{errors.imgNum}</p>}
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
                        <Label for="description">
                            Body{isUserLoggedIn()?"":"*"}
                        </Label>
                        <Input 
                            type="textarea" 
                            name="description" 
                            rows="7"
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                            required
                        />
                    </InputGroup>
                    {isUserLoggedIn()? (
                        <React.Fragment>
                            <InputGroup>
                                <Label for="img">Contact Information</Label>
                                <small>Deselect "Email" to use registered email</small>
                                    <CheckBoxContainer>
                                        <div className="CheckBoxItem">
                                            <Input 
                                                type="checkbox" 
                                                value="email" 
                                                checked={selectedEmail? true:false}
                                                onChange={(e)=>setSelectedEmail(selectedEmail==""?e.target.value:"")}
                                            />{" "}Email 
                                        </div>
                                        <div className="CheckBoxItem">
                                            <Input 
                                                type="checkbox" 
                                                value="addPhone" 
                                                checked={phoneSelected? true:false}
                                                onChange={(e)=>setPhoneSelected(phoneSelected==""?e.target.value:"")}
                                            />{" "} Phone
                                        </div>
                                    </CheckBoxContainer>
                                
                            </InputGroup>
                            {selectedEmail &&
                                <InputGroup>
                                    <Label for="email">Email </Label>
                                    {errors.email && <p className="text-danger">{errors.email}</p>}
                                    <Input 
                                        type="email" 
                                        name="email"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                    />                            
                                </InputGroup>
                            }
                            {phoneSelected && 
                                <InputGroup>
                                    <Label for="phone">Phone</Label>
                                    {errors.phone && <p className="text-danger">{errors.phone}</p>}
                                    <Input 
                                        type="tel" 
                                        name="phone"
                                        value={phone}
                                        onChange={(e)=>setPhone(e.target.value)}
                                    />                            
                                </InputGroup>                            
                            }
                        </React.Fragment>                        
                    )
                    :
                    <React.Fragment>
                        <cite className="text-muted d-block">*Anonymous users must put their contact info in the body.</cite>
                        <cite className="text-muted d-block">SignIn/Register to have more options for your flyers.</cite>
                    </React.Fragment>
                    }
                    {isUserLoggedIn() &&
                        <InputGroup>
                            <Label>
                                <Input 
                                    type="checkbox"
                                    name="template"
                                    value="template"
                                    checked={template? true:false}
                                    onChange={(e)=>setTemplate(template==""?e.target.value:"")}
                                />
                                {" "}
                                Want to make this flyer a template for future use?
                            </Label>
                        </InputGroup>                    
                    }
                    <Button 
                        type="submit"
                        color='primary'
                        outline={false}
                        disabled={flyer.editingFlyer? true:false}
                    >
                        {flyer.editingFlyer?
                            <Spinner color="light"></Spinner>
                        :
                        "Edit Flyer"
                        }
                    </Button>
                </form>
            </FormWrapper>
        </EditFlyerStyle>
    )}

const mapStateToProps = (state: StoreState) => ({
    reduxLocation: state.location,
    flyer: state.flyer,
    user: state.user
  });

export default connect(mapStateToProps, {
    editFlyer,
    setOpenFlyerPane
})(EditFlyer);
