import { v2 as cloudinary } from 'cloudinary';

    cloudinary.config({ 
        cloud_name: process.env.COULD_NAME as string, 
        api_key: process.env.COULD_API_KEY as string, 
        api_secret: process.env.COULD_SECRET_KEY as string,
        secure: true,
    });
    export default cloudinary;