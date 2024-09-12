import { v2 } from "cloudinary";
import { createReadStream } from "streamifier";

export const uploadToCloudinary = async (buffer: Buffer) => {
    return new Promise((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        { resource_type: 'image',folder:"Mykart" }, // or 'auto' for multiple types of files
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      createReadStream(buffer).pipe(stream); // Convert buffer to stream and pipe it
    });
  };