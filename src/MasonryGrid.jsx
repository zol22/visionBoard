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

        <div className="py-16 px-6 max-w-screen-xl mx-auto">
            {/* Vision Board Title & Description */}
            <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-neutral-900 mb-4">
                Create Your Vision Board for 2025
            </h1>
            <p className="text-lg text-neutral-600 mb-6">
                Start the year with a fresh perspective. Focus on your goals, family, love, personal growth, and more. Let’s build the vision for a new you in 2025. Choose the topics that inspire you!
            </p>
            <p className="text-md text-neutral-500">
                This interactive vision board helps you visualize your goals and dreams. Click on each topic to personalize your vision for the future.
            </p>
        </div>
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
                                    <img  src={getThesource(index)} className='w-full h-auto'></img>
                                </div>
                            ): <>                        
                                <div className='mb-4'>
                                    <img src={topics.src} className='w-full h-auto'></img>
                                </div>
                            </> 
                        }
                            
                            </div>
                            <div className='absolute inset-0 flex flex-col items-center justify-center px-9 text-center bg-opacity-95 bg-black text-white backface-invisible [transform:rotateY(180deg)]'>
                                    <h1 className='text-2xl font-semibold mb-2'>{topics.title}</h1>
                                    <p className='text-md italic mb-4'>{topics.description}</p>
                                    <button onClick={() => setState(index)} className='rounded-full bg-neutral-800 py-2 px-3.5 text-sm capitalize  '>
                                        Add image
                                    </button>
                            </div>
                        </div>
                    </div>
                ))}
                    {popUpOpen ? <PopUp index={currentButtonIndex} image={imageGrid} setImage={setImageGrid} trigger={popUpOpen} setTrigger={setPopupOpen}/> : null }
            </div>
        </div>
)
};

export default MasonryGrid;