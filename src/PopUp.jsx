import { useState } from "react";
import axios from 'axios';
import Unplash from "./Unplash";



const PopUp = (props) => {

    const [unplashContainer, setUnplashContainer] = useState(false) 
    
    const handleOnChange = (e) => {
        const target = e.target;
        const files = target.files;

        /* Ensure the user has selected a valid file. */
        if (files && files.length > 0) {

            /* Build an object representing the new image */
            const newImage = {
                id: props.index, 
                src: URL.createObjectURL(files[0]), // Create a temporary URL for the file
              };

            /* Update imageGrid state with the new image */
              props.setImage((prevImage) => {

                /*  Check if there’s already an image for this topic (props.index) in the imageGrid state. 
                    Example:
                    Let's say prevImage = [{ id: 1, src: 'blob:http://localhost/xyz123' }].
                    The function checks if any image has id === 2 (the current topic). If yes, it returns the index; otherwise, -1.
                */
                const existingImageIndex = prevImage.findIndex(
                  (image) => image.id === props.index
                );
                console.log(existingImageIndex)

                /* 
                Case 1: The image already exists.
                Example:
                prevImage = [{ id: 2, src: 'blob:http://localhost/old123' }].
                The existingImageIndex is 0.
                The code creates a copy of prevImage and replaces the entry at index 0 with newImage.
                Result: The updated imageGrid is:
                updatedImages = [{ id: 2, src: 'blob:http://localhost/abc123' }];
                Case 2: The image doesn’t exist.
                Example:
                prevImage = [{ id: 1, src: 'blob:http://localhost/xyz123' }].
                existingImageIndex = -1 (no image for topic 2).
                The code appends newImage to prevImage.
                Result: The updated imageGrid is:
                updatedImages = [
                    { id: 1, src: 'blob:http://localhost/xyz123' },
                    { id: 2, src: 'blob:http://localhost/abc123' }
];*/
                if (existingImageIndex !== -1) {
                  // Update the existing image after selecting one time the 'Select Files' button
                  const updatedImages = [...prevImage];
                  updatedImages[existingImageIndex] = newImage;
                  return updatedImages;
                } else {
                  // Add a new image, first time selecting images in 'Select Files' button
                  return [...prevImage, newImage];
                }
              });
                
                // Close the popup automatically after selecting a file (optional)
                props.setTrigger(false);

        }   
    }

    const fetchAPI = async() => {
        setUnplashContainer(!unplashContainer);
        const response = await axios.get('https://api.unsplash.com/photos/?client_id=999Z-NGPpt8Vx6ZlgbVaMpIleKyFKlNCXlDY0ZDsaBc');
        console.log(response.data);
        const data = await response.data

    }

    return (props.trigger) ? (
        <div className="fixed w-full h-full flex flex-col items-center justify-center left-0 top-0 bg-slate-500 moda-container">
            <div className="bg-white rounded-s p-2 w-3/4 modal">
                <div className="flex justify-end text-base modal-header">
                    <button className='rounded-full bg-neutral-800 py-2 px-3.5 text-sm capitalize text-white' onClick={()=> props.setTrigger(false)}>&times;</button>
                </div>
                
                <div className="mb-10 modal-content">
                    <h1 className="flex items-center justify-center p-2">Hi there, this is my title</h1>
                    <p className="flex items-center justify-center p-2 m-3">This is more description to keep in mind</p>
                    <div className="flex justify-evenly">
                        <input onChange={handleOnChange} accept='image/*' type='file' className=" bg-neutral-800 p-3 rounded-s text-sm text-white"/>
                        <button onClick={fetchAPI} className=" bg-neutral-800 p-3 rounded-s text-sm text-white">Search on Unplash</button>
                        
                    </div>                    
                </div>
            </div>
            { unplashContainer ? <Unplash /> : null}
        </div>
    ): null

}

export default PopUp;
