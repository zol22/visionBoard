import { topics } from './visionBoardTopics.ts';
import PopUp from './PopUp.jsx';
import { useState } from 'react'


const MasonryGrid = () => {

    const [popUpOpen, setPopupOpen] = useState(false);
    const [imageGrid, setImageGrid] = useState([]);
    const [currentButtonIndex, setCurrentButtonIndex] = useState(null);


    const setState = (index) => {
        setPopupOpen(!popUpOpen);
        setCurrentButtonIndex(index);
    }

    const getThesource = (index) => {
    // Find the selected image in the imageGrid
      const selectedImage = imageGrid.find((image) => image.id === index);
      console.log(imageGrid)
      return selectedImage ? selectedImage.src : '';
    }
    

    return (
        <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4'>
            {topics.map((topics,index) =>(
                <div key={index} className='group cursor-pointer'>
                    <div className='relative [transform-style:preserve-3d] transition-all group-hover:[transform:rotateY(180deg)] duration-500 '>
                        <div className='mb-4'>
                        {/* Explanation:
                            If getThesource(index) returns an image source (src):
                                It means the user has selected or updated an image for this topic.
                                The <img> tag will display the updated image (from imageGrid).
                            If getThesource(index) returns nothing (falsy):
                                It means no image has been selected for this topic.
                                The <img> tag will display the default image (topic.src from the topics array).
                            ImageGrid is updated on PopUp component */}
                        {getThesource(index) ? (
                            <div>
                                <img  src={getThesource(index)} className='w-full object-cover'></img>
                            </div>
                        ): <>                        
                            <div className='mb-4'>
                                <img src={topics.src} className='w-full object-cover'></img>
                            </div>
                        </> 
                    }
                          
                        </div>
                        <div className='absolute inset-0 flex flex-col items-center justify-center px-9 text-center bg-opacity-95 bg-neutral-400 backface-invisible [transform:rotateY(180deg)]'>
                                <h1 className='text-3x font-bold text-white'>{topics.title}</h1>
                                <p className='te{{xt-lg italic text-white mb-3'>{topics.description}</p>
                                <button onClick={() => setState(index)} className='rounded-full bg-neutral-800 py-2 px-3.5 text-sm capitalize text-white'>
                                    Add image
                                </button>
                        </div>
                    </div>
                </div>
            ))}
                {popUpOpen ? <PopUp index={currentButtonIndex} image={imageGrid} setImage={setImageGrid} trigger={popUpOpen} setTrigger={setPopupOpen}/> : null }
        </div>
)
};

export default MasonryGrid;