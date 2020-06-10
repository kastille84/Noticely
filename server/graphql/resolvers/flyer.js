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
    }
}