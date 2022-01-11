import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import useSWR from 'swr'
import { fetcher } from './Review'
import Pagination from './Pagination'
function Updated({location}) {
    const [pageIndex, setPageIndex] = useState(1);
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    const {data} = useSWR(`https://light-nvls.herokuapp.com/categories/updates/${location.search}`,fetcher)


    return (
        <div className='bg-gray-900 pt-20 pb-10'>
            <div className='bg-gray-800 pt-14 sm:px-2 lg:px-4 xl:px-6 mx-auto w-11/12 sm:w-4/5 lg:w-3/4 xl:w-4/6'>
                <div className='border-b-2 border-gray-400 px-4 pb-2'> 
                <h1 className='text-2xl text-gray-400'>Recently Updated Light Novel Chapters</h1>
                <p className='text-gray-400 text-lg '>Light Novel chapter translations are added to the Light Novel Pub platform as soon as the process is completed. It covers episodes that have aired in the past few days. You can follow new episodes of the most popular light novels on our platform.</p>
                </div>
                <Pagination current={data?.current} previous={data?.previous} pages_count={data?.pages_count}
                    next={data?.next} pageIndex={pageIndex} setPageIndex={setPageIndex} location={location}/>
            <div className='sm:grid sm:grid-cols-2 justify-center place-items-start flex flex-col my-1'>
            {data?.results.map(item=>(
                <div className='grid grid-cols-4  md:m my'>
                    <Link className='col-start-1 ' to={`/novel/${encodeURIComponent(item.novel_slug)}`}>
                    <img src={item.novel_cover} className='w-14 h-20' alt="" />
                    </Link>
                    <div className='col-start-2 col-span-3 place-self-start'> 
                        <Link to={`/novel/${encodeURIComponent(item.novel_slug)}`} 
                        className='text-gray-200  text-sm
                         line-clamp-1'>{item.novel_title}</Link>
                        <Link to={`/chapter/${encodeURIComponent(item.slug)}`} className='text-indigo-400 sm:w-40 md:w-64 xl:w-96 text-sm
                         line-clamp-1'>{item.title}</Link>
                        <div className='flex items-center space-x-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
                        <h1 className='text-sm   text-gray-400'>Update {formatDistanceToNow(
                            new Date(moment.utc(item.created_at).local().format()),
                            {
                                addSuffix: true,
                            }
                            )}</h1>
                            </div>
                    </div>
                </div>
            ))}
            </div>
            </div>
        </div>
    )
}

export default Updated
