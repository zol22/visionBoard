import imagesUnplash from "./imagesUnplash";

const Unplash = () => {
    return (
        <div className="bg-white rounded-s p-2  w-2/4 mt-10">
            <div className="max-x-md mx-auto w-full flex">
                <input  className="bg-gray-50 border border-gray-300 text-sm w-full indent-2
                p-2.5 outline-none focus:border-blue-500 focus:ring-2 rounded-tl rounded-bl" type="search" placeholder="Search anything..."/>
                <button disabled className="bg-neutral-800  px-6 py-2.5 text-white focus:ring-blue-300 disabled:bg-gray-400">Search</button>
            </div>
        </div>
    )
    
}

export default Unplash