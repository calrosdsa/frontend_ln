import React from 'react'

function LibraryItem({nov}) {
    return (
        <div>
            <div className=" p border-b-2 border-gray-500 col-start-2 col-span-5">

<div className="col-start-2 col-span-2    ">
    <div className="flex items-start ">
<img className="w-12  h-16" src={nov.cover} alt="" />
<h1 className="text-lg ml-2 mt-1 font-bold text-gray-400">{nov.title}</h1>
    </div>
</div>
</div>
        </div>
    )
}

export default LibraryItem
