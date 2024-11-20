import { useState } from "react";
import axios from 'axios';
import Unplash from "./Unplash";



const PopUp = (props) => {

    const [unplashContainer, setUnplashContainer] = useState(false) 
    
    const handleOnChange = (e) => {
        const target = e.target;
        const files = target.files;

        /* If you have an object with 2 properties with the same name, you end up using the later one*/
        if (files && files.length > 0) {

            const newImage = {
                id: props.index, // associate with the current topic index
                src: URL.createObjectURL(files[0]),
              };

            // Update imageGrid state with the new image
              props.setImage((prevImage) => {
                // Check if an image for this index already exists
                const existingImageIndex = prevImage.findIndex(
                  (image) => image.id === props.index
                );
                if (existingImageIndex !== -1) {
                  // Update the existing image
                  const updatedImages = [...prevImage];
                  updatedImages[existingImageIndex] = newImage;
                  return updatedImages;
                } else {
                  // Add a new image
                  return [...prevImage, newImage];
                }
              });


               /*props.setImage(prevImage => [
                ... prevImage,
                {
                        id: props.index,
                        src: URL.createObjectURL(files[0]),
                        change: 'Yes'
            
                }
               ])*/
                
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
