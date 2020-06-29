//packages
const jwt = require("jsonwebtoken");
const {uuid} = require("uuidv4");

//Model
const User = require('../../models/User');
const Flyer = require('../../models/Flyer');
const Place = require('../../models/Place');

//AWS S3
const aws = require("aws-sdk");
aws.config.region = 'us-east-1';
const S3_BUCKET = process.env.S3_BUCKET_NAME;

module.exports = {
    signS3: async(args, req) => {
        const uniqueFileName = 
            (args.s3Input.fileName.slice(0,args.s3Input.fileName.length-4))
            +"__"
            + uuid()
            + (args.s3Input.fileName.slice(args.s3Input.fileName.length-4))
        const s3 = new aws.S3();
        const fileName = uniqueFileName;
        const fileType = args.s3Input.fileType;
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        }

        try {
            const data = await s3.getSignedUrl('putObject', s3Params);
            return {
                signedRequest: data,
                url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
            }
        } catch(error) {
            throw error;
        }
    },
    makeFlyer: async (args, req) => {
        // pull out user from req or else it's anonymous user
        const jwtObj= req.headers.authorization.length > 11? jwt.decode(req.headers.authorization.slice(7)): {};
        try {
            // save the location where the flyer is made. provided it's a new location
            let locationExists = await Place.findOne({place_id: args.flyerInput.placeId});
            if (!locationExists) {
                const newLocation = new Place({
                    place_id: args.flyerInput.placeId,
                    name: args.flyerInput.name,
                    formattedAddress: args.flyerInput.formattedAddress,
                    latlng: args.flyerInput.latlng
                });
                locationExists = await newLocation.save();
            } 
            //set flyer
            const newFlyer = new Flyer({
                user: jwtObj._id? jwtObj._id: null,
                placeId: locationExists._id,
                heading: args.flyerInput.heading,
                description: args.flyerInput.description,
                images: args.flyerInput.images[0].split(","),
                contact: {
                    email: args.flyerInput.contact.email? args.flyerInput.contact.email: (jwtObj.email?jwtObj.email:""),
                    phone: args.flyerInput.contact.phone? args.flyerInput.contact.phone: ""
                }
            });
            let flyer = await newFlyer.save();
            await Flyer.populate(flyer, "user" ,(err, popFlyer) => {
                flyer=popFlyer;
            })
            // save flyerId into user's flyer array ,if user is not anonymous
            if(Object.keys(jwtObj).length > 0) {
                const user = await User.findById(flyer.user);
                user.flyers = [...user.flyers, flyer._id];
                await user.save();
            }
            return flyer;

        } catch(error) {
            console.dir(error)
        }
    },
    editFlyer: async (args, req) => {
        // pull out user from req or else it's anonymous user
        const jwtObj= req.headers.authorization.length > 11? jwt.decode(req.headers.authorization.slice(7)): {};
        try {            
            const flyerResponse = await Flyer.findById(args.editFlyerInput._id);

            // check and delete old images
            const s3 = new aws.S3();
            const newImagesAsArray = args.editFlyerInput.images[0].split(",");

            if(flyerResponse.images.length > 0) {
                // image 1
                if(!newImagesAsArray.includes(flyerResponse.images[0])) {
                    // this images must be deleted from S3
                    let paramS3 = {
                        Bucket: S3_BUCKET,
                        Delete: {
                            Objects: [{
                                    Key: flyerResponse.images[0].slice(34, flyerResponse.images[0].length)
                            }]
                        }
                    }
                    await s3.deleteObjects(paramS3, function(err, data){
                        if(err){"errS3",console.log(err)}
                        else console.log(data)
                    })
                }
                // image 2
                if(flyerResponse.images[1]) {
                    if(!newImagesAsArray.includes(flyerResponse.images[1])) {
                        // this images must be deleted from S3
                        let paramS3 = {
                            Bucket: S3_BUCKET,
                            Delete: {
                                Objects: [{
                                        Key: flyerResponse.images[1].slice(34, flyerResponse.images[1].length)
                                }]
                            }
                        }
                        await s3.deleteObjects(paramS3, function(err, data){
                            if(err){"errS3",console.log(err)}
                            else console.log(data)
                        })
                    }
                }
            }

            // update and save
            flyerResponse.heading =  args.editFlyerInput.heading;
            flyerResponse.description = args.editFlyerInput.description;
            flyerResponse.images = args.editFlyerInput.images[0].split(",");
            flyerResponse.contact = {
                    email: args.editFlyerInput.contact.email? args.editFlyerInput.contact.email: (jwtObj.email?jwtObj.email:""),
                    phone: args.editFlyerInput.contact.phone? args.editFlyerInput.contact.phone: ""
                };
            const updatedFlyer = await flyerResponse.save();
            
            return updatedFlyer;

        } catch(error) {
            console.dir(error)
        }
    },
    getFlyersByPlace: async(args, req) => {
        try {
            const placeResponse = await Place.findOne({place_id: args.flyersByPlaceInput.place_id});
            if(!placeResponse) {
                return [];
            }
            const flyerResponse = await Flyer.find({placeId: placeResponse._id}).populate("user");
            return flyerResponse;

        } catch(error) {
            console.log("error", error);
        }
    },
    getFlyersByUser: async(args, req) => {
        try {
            const flyerResponse = await Flyer.find({user: args.userId}).populate("placeId").populate("user");
            if(!flyerResponse) {
                return [];
            }
            return flyerResponse;
        } catch(error) {
            console.log("error", error)
        }
    },
    deleteFlyer: async(args, req) => {
        try {
            const flyerResponse = await Flyer.findByIdAndRemove(args.flyerId).populate("user");
            // remove images related to this flyer
            if(flyerResponse.images.length >0) {
                const imagesToDelete = [];
                for( let img of flyerResponse.images) {
                    imagesToDelete.push({
                        Key: img.slice(34, img.length)
                    })
                }
                let paramS3 = {
                    Bucket: S3_BUCKET,
                    Delete: {
                        Objects: imagesToDelete
                    }
                }
                const s3 = new aws.S3();
                s3.deleteObjects(paramS3, function(err, data){
                    if(err){"errS3",console.log(err)}
                    else console.log(data)
                })
            }
            // find the user
            const userResponse = await User.findById(flyerResponse.user._id);
            let newUserFlyersArr = [...userResponse.flyers].filter(flyerObjId => flyerObjId.toString() !==args.flyerId)
            // update/remove flyer from user's flyers property
            const userUpdateResponse = await User.findByIdAndUpdate(userResponse._id, {flyers: newUserFlyersArr});
            // use all other flyer to see if they have flyerResponse's placeId
            const allFlyersResponse = await Flyer.find({placeId: flyerResponse.placeId});
            // If you get results, do nothing
            // If it comes out empty, it means no other flyer is at that place. Delete that place.
            if (!allFlyersResponse.length) {
                const placeResponse = await Place.findOneAndRemove({_id:flyerResponse.placeId});
            }
            return flyerResponse;

        } catch(error) {
            console.log("error", error);
        }
    }
}