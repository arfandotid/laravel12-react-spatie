//import react
import { useState } from "react";

//import inertia router
import { router } from "@inertiajs/react";

//import icons
import { Search } from "lucide-react";

export default function SearchComponent({ URL }) {
    //define state search
    const [search, setSearch] = useState("");

    //function "searchHandler"
    const handleSearch = (e) => {
        e.preventDefault();

        //fetch to search
        router.get(`${URL}?q=${search}`);
    };

    return (
        <>
            <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
                    {/* Search input */}
                    <div className="flex-1">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari data..."
                                className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-3 mt-3 md:mt-0">
                        <button
                            type="submit"
                            className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Search className="w-4 h-4 inline mr-2" />
                            Search
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}
