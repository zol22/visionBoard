import { useState } from "react";
import axios from 'axios';
import Unsplash from "./Unsplash";

const PopUp = (props) => {
    const [unsplashContainer, setUnsplashContainer] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImage = {
                id: props.index,
                src: URL.createObjectURL(files[0]),
            };

            props.setImage((prevImage) => {
                const existingImageIndex = prevImage.findIndex(
                    (image) => image.id === props.index
                );
                if (existingImageIndex !== -1) {
                    const updatedImages = [...prevImage];
                    updatedImages[existingImageIndex] = newImage;
                    return updatedImages;
                } else {
                    return [...prevImage, newImage];
                }
            });
            props.setTrigger(false);
        }
    };

    const fetchAPI = async () => {
        try {
            const response = await axios.get(
                `https://api.unsplash.com/search/photos`,
                {
                    params: { query: searchQuery, per_page: 12 },
                    headers: {
                        Authorization: "Client-ID 999Z-NGPpt8Vx6ZlgbVaMpIleKyFKlNCXlDY0ZDsaBc",
                    },
                }
            );
            setSearchResults(response.data.results);
            setUnsplashContainer(true);
        } catch (error) {
            console.error("Error fetching from Unsplash: ", error);
        }
    };

    const handleImageSelect = (image) => {
        const newImage = {
            id: props.index,
            src: image.urls.small,
        };

        props.setImage((prevImage) => {
            const existingImageIndex = prevImage.findIndex(
                (img) => img.id === props.index
            );
            if (existingImageIndex !== -1) {
                const updatedImages = [...prevImage];
                updatedImages[existingImageIndex] = newImage;
                return updatedImages;
            } else {
                return [...prevImage, newImage];
            }
        });
        setUnsplashContainer(false);
        props.setTrigger(false);

    };

    return props.trigger ? (
        <div 
            className="fixed w-full h-full flex flex-col items-center justify-center left-0 top-0 bg-black bg-opacity-70 overflow-hidden"
            onClick={() => props.setTrigger(false)} // Close on background click
        >
            {/* Popup Container */}
            <div 
                className="bg-white rounded-lg shadow-lg p-6 w-3/4 max-w-lg z-10"
                onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                >
                <div className="flex justify-end">
                    <button
                        className="rounded-full bg-neutral-800 py-2 px-3.5 text-sm text-white"
                        onClick={() => props.setTrigger(false)}
                    >
                        &times;
                    </button>
                </div>
                <h1 className="text-center font-bold text-lg mb-4">
                    Add or Search for an Image
                </h1>
                <p className="text-center text-sm mb-4">
                    Upload from your computer or search online
                </p>
                <div className="flex flex-col gap-4">
                    <input
                        onChange={handleFileChange}
                        accept="image/*"
                        type="file"
                        className="bg-neutral-800 text-white rounded py-2 px-3 cursor-pointer"
                    />
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search Unsplash"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="p-2 border rounded w-full"
                        />
                        <button
                            onClick={fetchAPI}
                            className="bg-neutral-800 text-white rounded py-2 px-3 ml-2"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Unsplash Container */}
            {unsplashContainer && (
                <div className="bg-white rounded-lg shadow-lg mt-4 w-3/4 max-w-4xl overflow-y-auto h-96 p-6">
                    <Unsplash
                        searchResults={searchResults}
                        handleImageSelect={handleImageSelect}
                    />
                </div>
            )}
        </div>
    ) : null;
};

export default PopUp;
