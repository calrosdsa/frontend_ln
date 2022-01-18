import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import Title from './Title'
import { getTags } from '../../actions/post'
function FilterTag({location}) {
    const dispatch = useDispatch()
    const tag = useSelector(state=>state.filter.tag)
    const tags = useSelector(state=>state.filter.tags)
    const title = useSelector(state=>state.filter.title)


    useEffect(()=>{
        window.scrollTo(0,0)
        dispatch(getTags(location.search))
    },[getTags,location.search])
    return (
        <div className='bg-gray-900 pt-20 h-full lg:h-screen'>
            <div className='w-full sm:w-4/5 lg:w-4/6 mx-auto'> 
            <h1 className='px-3 sm:px-5 xl:px-10 border-b-2 pt-6 text-2xl pb-1 text-gray-400 mb-5 border-gray-400'>Explore the Most Popular Light Novel Tags</h1>
            <div className=' px-1 sm:px-5 xl:px-10 flex flex-wrap space-x-2 '>
            {tag.map(item=>(
                <div className='flex flex-wrap'>
                <Link to={(`/tag/?tags=${item.id}&ordering=-popular&`)} className='text-indigo-400 my px-1 
                    text-base xl:text-lg border-2 border-indigo-400'>
                    {item.title}
                    </Link>
                </div>
            ))}

            <Title 
            title = {title}
            location={location}
            />
            <div className='sm:grid text-lg my-1 lg:px-5 sm:grid-cols-2 w-full'>
            {tags.map(item=>(
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
