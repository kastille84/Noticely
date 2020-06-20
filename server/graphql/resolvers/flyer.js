//packages
const jwt = require("jsonwebtoken");

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
        const s3 = new aws.S3();
        const fileName = args.s3Input.fileName;
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
            console.log(error);
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
            console.log("locationExists", locationExists)
            console.log("typeof args.flyerInput.images",typeof args.flyerInput.images )
            console.log("args.flyerInput.images",args.flyerInput.images )
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
            console.log('MakeFlyer', flyer)
            console.log('MakeFlyer', flyer)
            // save flyerId into user's flyer array ,if user is not anonymous
            if(Object.keys(jwtObj).length > 0) {
                const user = await User.findById(flyer.user);
                user.flyers = [...user.flyers, flyer._id];
                await user.save();
            }
            console.log('flyer', flyer)
            return flyer;

        } catch(error) {
            console.dir(error)
        }
    },
    getFlyersByPlace: async(args, rec) => {
        try {
            const placeResponse = await Place.findOne({place_id: args.flyersByPlaceInput.place_id});
            console.log('response', placeResponse)
            if(!placeResponse) {
                return [];
            }
            const flyerResponse = await Flyer.find({placeId: placeResponse._id}).populate("user");
            console.log("flyerResponse", flyerResponse);
            return flyerResponse;

        } catch(error) {
            console.log("error", error)
        }
    }
}