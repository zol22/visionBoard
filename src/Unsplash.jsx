const Unsplash = (props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {props.searchResults.map((result) => (
                <div
                    key={result.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md  bg-gray-200" // Set background color to gray or any preferred color
                    onClick={() => props.handleImageSelect(result)}
                >
                    <img
                        src={result.urls.regular} // Use higher resolution for better quality
                        alt={result.alt_description || "Unsplash Image"}
                        className="w-full h-full  mb-4 rounded transition-transform duration-300 group-hover:scale-105" // Ensure the image fits the container
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-sm p-2">
                        {result.alt_description || "Click to select"}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Unsplash;
