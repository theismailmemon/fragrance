import { useState } from 'react';

const SearchInput = () => {
    const [search, setSearch] = useState(true);
    const [searchVariable, setSearchVariable] = useState('');

    const handleSearch = () => {
        setSearch(true);
        setSearchVariable('');
    };

    const clearSearch = () => {
        setSearch(true);
        setSearchVariable('');
    };

    return (
        <div className="flex items-center bg-gray-100 border border-gray-300 focus:border-blue-500 px-4 rounded-xl focus:outline-none">
         
                {searchVariable.length === 0 ? (
                    <span className="cursor-pointer text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-search"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                    </span>
                ) : (
                    <span onClick={handleSearch} className="cursor-pointer text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-arrow-left"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                    </span>
                )}
        
            <span className="ml-5 w-full">
                <input
                    value={searchVariable}
                    onChange={(e) => setSearchVariable(e.target.value)}
                    className="font-normal text-lg w-full sm:py-3 py-2 bg-gray-100 focus:outline-none placeholder-[#6b6b6b] placeholder-opacity-75"
                    placeholder="Search for items by title..."
                />
            </span>
            <span
                onClick={clearSearch}
                className="cursor-pointer text-gray-700"
                style={{ display: searchVariable.length === 0 ? 'none' : 'block' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    strokeWidth="1.75"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                </svg>
            </span>
        </div>
    );
};

export default SearchInput;
