import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { fetcher } from '../novel/Review'
import Title from './Title'
function FilterTag({location}) {
    const {data} = useSWR(`https://light-nvls.herokuapp.com/categories/tags/${location.search}`,fetcher)
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return (
        <div className='bg-gray-900 pt-20 h-full lg:h-screen'>
            <div className='w-full sm:w-4/5 lg:w-4/6 mx-auto'> 
            <h1 className='px-3 sm:px-5 xl:px-10 border-b-2 pt-6 text-2xl pb-1 text-gray-400 mb-5 border-gray-400'>Explore the Most Popular Light Novel Tags</h1>
            <div className=' px-1 sm:px-5 xl:px-10 flex flex-wrap space-x-2 '>
            {data?.tag.map(item=>(
                <div className='flex flex-wrap'>
                <Link to={(`/tag/?tags=${item.id}&ordering=-popular&`)} className='text-indigo-400 my px-1 
                    text-base xl:text-lg border-2 border-indigo-400'>
                    {item.title}
                    </Link>
                </div>
            ))}

            <Title 
            title = {data?.title}
            location={location}
            />
            <div className='sm:grid text-lg my-1 lg:px-5 sm:grid-cols-2 w-full'>
            {data?.tags.map(item=>(
                <Link  to={`/tag/?tags=${item.id}&rdering=-popular`} className='m'>
                    <li >
                    {item.title}
                    </li>
                </Link>
            ))}
            </div>
            </div>
            </div>
        </div>
    )
}

export default FilterTag
