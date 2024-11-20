const Unsplash = (props) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {props.searchResults.map((result) => (
                <div
                    key={result.id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md"
                    onClick={() => props.handleImageSelect(result)}
                >
                    <img
                        src={result.urls.small}
                        alt={result.alt_description || "Unsplash Image"}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
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
