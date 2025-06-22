import React from 'react'

const Page = () => {
    return (
        <div>
            <input
                type="file"
                accept="image/*"
                className="mb-2 border-y-4 border-amber-500 focus-visible:border-white focus-visible:ring-0 outline-0 p-2 rounded-md"
            />
        </div>
    )
}
export default Page
