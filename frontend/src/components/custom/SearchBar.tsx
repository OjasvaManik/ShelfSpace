import React from 'react'

const SearchBar = (
    { children }: { children?: React.ReactNode }
) => {
    return (
        <div>
            <div>
                <form className="flex items-center justify-center w-full">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zm6.707 8.293a1 1 0 010 1.414l-3.586 3.586a1 1 0 01-1.414-1.414l3.586-3.586a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="simple-search"
                            className="opacity-100 border-8 outline-none border-amber-500 text-white text-sm rounded-full focus:ring-gray-500 focus:border-white block w-90 lg:w-200 pl-10 p-2.5 placeholder:text-white"
                            placeholder="Search..."
                            required
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pl-3 rounded-full">
                            {children}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default SearchBar
