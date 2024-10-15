import { topics } from './visionBoardTopics.ts';
import PopUp from './PopUp.jsx';
import { useState } from 'react'


const MasonryGrid = () => {

    const [idArrays, setIdArrays] = useState([]);
    const [popUpOpen, setPopupOpen] = useState(false);
    const [imageGrid, setImageGrid] = useState([
        {
            id : '',
            src:'',
            change: 'No'
        }
]);


    const [currentButtonIndex, setCurrentButtonIndex] = useState();

    const setState = (index) => {
        setPopupOpen(!popUpOpen);
        setCurrentButtonIndex(index);
        {setIdArrays([ ...idArrays, index])}
        console.log(index)

    }
    const getThesource = (images,index) => {
      return ((images.filter((image) => image.id === index)).map(image => image.src));
   
    }
    
    console.log(idArrays)

    return (
        <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4'>
            {topics.map((topics,index) =>(
                <div key={index} className='group cursor-pointer'>
                    <div className='relative [transform-style:preserve-3d] transition-all group-hover:[transform:rotateY(180deg)] duration-500 '>
                        <div className='mb-4'>

                        {index === currentButtonIndex ? (
                            <div>
                                <img  src={getThesource(imageGrid,index)}></img>
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