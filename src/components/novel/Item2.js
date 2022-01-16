import React from 'react'

function Item({dispatch,setSize,item,i,fontsize}) {
    return (
        <div key={i}>
             <h1 onClick={()=>dispatch(setSize(item.text))} key={i}
            className={` ${fontsize === item.text&& 'bg-indigo-600' }  text-base  sm:text-lg bg-indigo-400 cursor-pointer p rounded-full`}>{item.status}</h1>
        </div>
    )
}

export default Item
