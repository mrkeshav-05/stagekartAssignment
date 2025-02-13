// import axios from 'axios';

// interface CloudinaryResponse {
//   secure_url: string;
// }

// export const uploadImageToCloudinary = async (file: File): Promise<string> => {
//   const formData = new FormData();
//   formData.append('file', file);
//   formData.append('upload_preset', 'your_upload_preset'); // Replace with your upload preset name

//   try {
//     const response = await axios.post<CloudinaryResponse>( // Specify the type of the response data
//       `https://api.cloudinary.com/v1_1/dpy0baqtl/image/upload`, // Replace with your cloud name
//       formData
//     );

//     return response.data.secure_url; // URL of the uploaded image
//   } catch (error: any) { // Specify the type of the error
//     console.error('Error uploading image:', error);
//     throw error; // Re-throw to handle it in the calling function
//   }
// };

import axios from 'axios';

interface CloudinaryResponse {
  secure_url: string;
}

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // Replace with your upload preset name

  try {
    const response = await axios.post<CloudinaryResponse>( // Specify the type of the response data
      `https://api.cloudinary.com/v1_1/dpy0baqtl/image/upload`, // Replace with your cloud name
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return response.data.secure_url; // URL of the uploaded image
  } catch (error: any) { // Specify the type of the error
    console.error('Error uploading image:', error);
    throw error; // Re-throw to handle it in the calling function
  }
};