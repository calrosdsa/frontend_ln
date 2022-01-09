import React,{useState} from 'react'
import { XIcon,TrashIcon,FlagIcon,StarIcon } from '@heroicons/react/solid'
import moment from 'moment'
import { Link } from 'react-router-dom'
import axios from 'axios'

function LibraryItem({nov,data,mutate,key}) {
    const [open,setOpen] = useState(false)
    return (
        <div>
             <div key={key} className=" p border-b-2 border-gray-500">
                        <div className="grid-cols-9 grid gap-1  md:grid-cols-5 ">

                    <div className='col-start-1 space-x-2   flex col-span-8 md:col-span-2 '>
                    <img className="w-12   h-16 md:w-9 md:h-12 " src={nov.cover} alt="" />
                     <div className=''>
                    <Link to ={`/novel/${encodeURIComponent(nov.slug)}`} className="text-sm line-clamp-1  font-semibold text-gray-400">{nov.title}</Link>
                    <div className=' text-sm text-gray-400 flex space-x-2 items-center'> <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                   </svg> {moment(new Date(nov.updated)).format('MMM d, HH:mm:ss')}</div>
                    <h1 className='text-xs md:hidden text-gray-400'> Progress: {nov.progress}/{nov.chapters} (%{(nov.progress/nov.chapters*100).toFixed(1)})</h1>
                     </div>
                    </div>
                    <h1 className='md:text-sm  hidden md:flex md:place-self-center md:col-start-3  text-gray-400'>
                         {nov.progress}/{nov.chapters} (%{(nov.progress/nov.chapters*100).toFixed(1)})</h1>
                    <div className='hidden  md:block md:place-self-center'>
                        {nov.progress === nov.chapters? <h1 className='text-gray-500 md:text-xs lg:text-sm'>No updates</h1>:
                        <h1 className='text-green-300 md:text-xs lg:text-sm'>New Unread Chapters</h1>}
                    </div>
                    <div className='md:grid md:grid-cols-3 md:px-5 md:place-self-stretch
                     md:items-center place-self-end space-y-2 md:space-y-0 lg:px-10   
                     '>
                     {nov.options.includes(3) && 
                     <StarIcon className=' h-4 w-4  md:col-start-1'/>
                     }
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 col-start-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <svg onClick={()=>setOpen(true)} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:col-start-3 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                   </svg>
                    </div>
                   {open &&
                   <div className=' max-w-lg h-64 sm:h-72 lg:h-80 fixed p-1 rounded-xl  top-1/3 inset-0 bg-gray-900 shadow-2xl mx-auto'>
                       <div className='flex  justify-between'>
                       <h1 className='border-b-2 text-lg font-semibold w-full pb-2  border-gray-400 text-gray-400'>Library Command</h1>
                       <XIcon onClick={()=>setOpen(false)} className='cursor-pointer h-8 w-8'/>
                       </div>
                       <h1 className='pt-2 px-2 sm:px-3 lg:px-4 text-gray-400 line-clamp-1 font-light text-lg'>{nov.title}</h1>
                      
                     
                       <div className='pt-3 px-2 sm:px-3 lg:px-4'>
                           <div 
                           onClick={async()=>{
                            mutate({...data})
                            await axios.put(`/novels/option/${nov.id}/`,{'option': 2})
                            mutate({...data})

                            setOpen(false)
                            }}
                            className='flex cursor-pointer hover:border-b-4 hover:border-indigo-500 md:px-4 py justify-between bg-white '>
                               <h1 className=' font-semibold  text-black'>
                               {nov.options.includes(2) ? 'I have not completed it yet' : 'I have completed this book'}
                                   </h1>
                               <FlagIcon className='h-6 w-6'/>
                           </div>
                       </div>
                       
                        
                          
                           
                       <div className='pt-3 px-2 sm:px-3 lg:px-4'>
                           <div onClick={async()=>{
                               mutate({...data})
                               await axios.put(`/novels/option/${nov.id}/`,{'option': 3})
                               mutate({...data})
                               setOpen(false)
                           }} className='flex cursor-pointer hover:border-b-4 hover:border-indigo-500 md:px-4 py justify-between bg-white '>
                               <h1 className=' font-semibold  text-black'>
                               {nov.options.includes(3) ? 'Remove Favorite' : 'Add to Favorites'}
                                   </h1>
                               <StarIcon className='h-6 w-6'/>
                           </div>
                       </div>
                         
                           
                       <div className='pt-3 px-2 sm:px-3 lg:px-4'>
                           <div
                            onClick={async()=>{
                                mutate({...data})
                               await axios.post(`/novels/favorites-products/update/${nov.id}/`)
                               mutate({...data})
                               setOpen(false)
                             }} 
                           className='flex cursor-pointer hover:border-b-4 hover:border-indigo-500 md:px-4 py justify-between bg-white '>
                               <h1 className=' font-semibold  text-black'>Remove from Library</h1>
                               <TrashIcon className='h-6 w-6'/>
                           </div>
                       </div>
                   </div>
                   }
                        </div>
                    </div>
        </div>
    )
}

export default LibraryItem
