import React,{useState,useMemo,useEffect} from 'react'
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import { fetcher } from '../novel/Review'
import {XIcon} from '@heroicons/react/solid'
import useSWR from 'swr'
import { useHistory } from 'react-router-dom'

function AdvancedFilter({location}) {
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])
    const options = [
        {
            "status": "All",
            "id": '' 
        },
        {
            "status": "Ongoing",
            "id": 2
        },
        {
            "status": "Completed",
            "id": 3
        }
    ]
    const ordering = [
        {
            "ordering": "All",
            "id": '' 
        },
        {
            "ordering": "Rank",
            "id": '-rank' 
        },
        {
            "ordering": "Last Updates",
            "id": '-updated'
        },
        {
            "ordering": "Book Marked",
            "id": '-book_marked'
        },
        {
            "ordering": "Rating",
            "id": '-average' 
        },
        {
            "ordering": "Reviews",
            "id": '-reviews'
        },
        {
            "ordering": "Title",
            "id": '-title'
        },
        {
            "ordering": "Popular",
            "id": '-popular'
        },
    ]
    const {data} = useSWR(`https://light-nvls.herokuapp.com/novels/advancedfilter/${location.search}?`, fetcher,{revalidateIfStale:false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false})
        const history = useHistory()
        const [value,setValue] = useState([])
        const [show,setShow] = useState(true)
        const [wordEnter,setWordEnter] = useState('')
    const [cursor,setCursor]=useState(-1)
    const [tagValue,setTagValue] = useState([])
    const [selectedOption, setSelectedOption] = useState(options[0].id)
    const [selectedOrdering, setSelectedOrdering] = useState(ordering[0].id)
    const [ min,setMin] = useState('')
    const [max,setMax] = useState('')
    const [match,setMatch] = useState('')

    
    
    const tagssuggestions =useMemo(()=>{
        if(!wordEnter)
        return []
        const arr = data?.tags.filter(tag => tag.title.toLowerCase().includes(wordEnter.toLowerCase()))
        return arr.slice(0,5)
    },[wordEnter])
    
    
    const handleClick = (item)=>{
        const index =  `category=${item}&`
        if(value[index]!==""||value[index]!==null||value[index]!=='null'){
            setValue(value=>[...value, `category=${item}&`])
        }
        var myIndex = value.indexOf(index);
        if (myIndex > -1) {
            setValue(value.filter(function(f) { return f !== index }))  
        }
        return value
    }
    const handleClickTag = (item,title)=>{
        const index =  `tags=${item}&`
        if(value[index]!==""||value[index]!==null||value[index]!=='null'){
            setValue(value=>[...value, `tags=${item}&`])
            setTagValue(tagValue=>[...tagValue,title])
        }
            var myIndex = value.indexOf(index);
            if (myIndex > -1) {
                setValue(value.filter(function(f) { return f !== index }))  
                setTagValue(tagValue.filter(function(f){ return f !== title}))
           }
           return value
        }
    const removeTag=(tag)=>{
        setTagValue(tagValue.filter(function(f) { return f !== tag }))  
    }
        const cleanInput = ()=>{
            setWordEnter('')
            
        }
        const handleFilter =()=>{
            history.push(`/filter/?${value.join('')}${selectedOption}${selectedOrdering}${min}${max}${match}`)
            setShow(false)
        }
        const clearFilter = () =>{
            history.push(`/filter`)
            setTagValue([])
            setValue([])
            setMin('')
            setMatch('')
            setMax('')
            setSelectedOption('')
            setSelectedOrdering('')
        }
    
        const keyboardNavigation =(e)=>{
            if(e.key ==="ArrowDown"){
              setCursor(c => (c <  tagssuggestions.length -1 ? c + 1 : c))
            }
          
            if(e.key ==="ArrowUp"){
              setCursor(c=>(c > 0 ? c -1: 0));
            }
            
            if(e.key ==="Escape"){
              setWordEnter('')
           }
           if(e.key ==="Enter"){
              const index =  `tags=${tagssuggestions[cursor].id}&`
              if(value[index]!==""||value[index]!==null||value[index]!=='null'){
                  setValue(value=>[...value, `tags=${tagssuggestions[cursor].id}&`])
                  setTagValue(tagValue=>[...tagValue, tagssuggestions[cursor].title])
              }
              var myIndex = value.indexOf(index);
              if (myIndex > -1) {
                  setValue(value.filter(function(f) { return f !== index }))  
                  setTagValue(tagValue.filter(function(f){ return f !== tagssuggestions[cursor].title}))
             }
              setWordEnter('')

           }
          }
    
    return (
        <div className='bg-gray-800 pt-20 pb-100 '>
            <div className='w-full sm:w-5/6 mx-auto lg:w-3/4 xl:w-4/6 2xl:w-1/2 pt-10'>
                <div className='flex items-center justify-between border-b-2 border-gray-400 px-2 pb-6 md:px-4'>
                <h1 className='text-gray-400 text-base sm:text-lg lg:text-2xl '>Search Novels with Advanced Filtering Function</h1>
                <button className='bg-indigo-500 outline-none p text-base lg:text-lg rounded-lg' 
                onClick={()=>setShow(!show)}
                >
                    {show ?'Hidden Filters':'Show Filters'}
                    </button>
                </div>
            {show &&
            <div className=''>

                <div className='flex  items-center space-x-4'>
                <h1 className='text-gray-400 text-2xl'>Categories</h1>
                <h1>(Matches ALL categories selected)</h1>
                </div>
            <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  pb-10'>
            {data?.category.map(item=>(
                <div className=' cursor-pointer'
                >
                       <span onClick={()=>handleClick(item.id)} className={`bg-gray-200 w-44 p line-clamp-1 my-1
                        text-gray-700 ${value.includes(`category=${item.id}&`)  && 'bg-indigo-500'} `}>
                       {item.title}
                       </span>
                       </div>
                ))}
            </div>
            <div className=' pb-10 '>
                <div className='flex space-x-5 items-center'>
                <h1 className='text-2xl text-gray-400'>Tags</h1>
                <h1>(Matched All Tags Selected)</h1>
                </div>
            <div className='py flex flex-wrap '>
                <div className=' flex   space-x-3 rounded-lg text-gray-800 '>{tagValue.map(item=>(
                    <div key={item} onClick={()=>removeTag(item)} className=' bg-gray-200 px-1 flex items-center rounded-lg cursor-pointer'>
                        <span>{item}</span>
                        <XIcon className='h-5 w-5 text-gray-600'/>
                    </div>
                    ))}</div>
                </div>
            <input 
           onKeyDown={e=>keyboardNavigation(e)}
           autoComplete='off'
           value={wordEnter} onChange={e=>setWordEnter(e.target.value)} type="text" placeholder='Search Light Novel by Title '
           className=' border-1  text-gray-200 px-2 h-12 outline-none border-gray-600  rounded-xl  
           w-full mx-auto flex  placeholder-gray-200' />
             {wordEnter&&<XIcon className="h-16 top-20 -mt-8  text-gray-200  p-1 absolute right-10 sm:right-16 lg:right-20"
              onClick={cleanInput}/>}
              <div className='bg-gray-400 max-h-40 absolute'>
              {tagssuggestions.map((item,idx)=>(
                  <div className={` cursor-pointer ${cursor === idx ? 'bg-gray-100 text-gray-500 w-72' : 'bg-gray-500' }`}>

                      <span onClick={()=>handleClickTag(item.id,item.title)}>

                      {item.title}
                      </span>
                      </div>
                  ))}
            </div>
                  </div>

                  <div className='pb-10 lg:flex space-y-7 lg:space-y-0 sm:space-x-3'>
                      <div className='flex space-x-5 pr-10'>
                      <h1 className='text-gray-400 text-2xl'>Translation Status</h1>
                      <select 
                       className='p text-lg outline-none'  name=" " id=""
                       value={selectedOption}
                       onChange={e => setSelectedOption(e.target.value)}>
                {options.map((item)=>(
                    <option value={`status=${item.id}&`}>{item.status}</option>
                    ))}
                  </select>
                    </div>
                     <div className=' flex space-x-7'>
                      <h1 className='text-gray-400 text-2xl'>Sort Results By...</h1>
                      <select 
                       className=' outline-none ring-0 text-lg p'
                       value={selectedOrdering}
                       onChange={e => setSelectedOrdering(e.target.value)}>
                    {ordering.map((item)=>(
                        <option value={`ordering=${item.id}&`}>{item.ordering}</option>
                        ))}
                  </select>
                        </div>
                  </div>
                  <div className='pb-10 lg:flex  space-y-7 lg:space-y-0 sm:space-x-10'>
                  <div className='flex flex-col   sm:px-0'>
                      <div className='flex items-center space-x-5'>
                  <h1 className='text-2xl text-gray-400'>Rating  Novel </h1>
                 <h3 className='text-lg text-gray-200'>(rating on a scale of 1 to 5)</h3>
                      </div>
 
                  <div className='flex space-x-10 pb-10'>
                      <select value={min} className='p text-lg font-semibold' name="" id=""
                       onChange={e => setMin(e.target.value)}
                      >
                          <option value='average_min=1&'>1</option>
                          <option value='average_min=2&'>2</option>
                          <option value='average_min=3&'>3</option>
                          <option value='average_min=4&'>4</option>
                          <option value='average_min=5&'>5</option>

                      </select>
                      <select value={max} className='p text-lg font-semibold' name="" id=""
                       onChange={e => setMax(e.target.value)}
                       >
                          <option value='average_max=1&'>1</option>
                          <option value='average_max=2&'>2</option>
                          <option value='average_max=3&'>3</option>
                          <option value='average_max=4&'>4</option>
                          <option value='average_max=5&'>5</option>

                      </select>
                  </div>
                  </div>
                  <div className='space-x-6 pb-5'>
                  <h1 className=' text-2xl text-gray-400'>Type of search</h1>
                  <select value={match} onChange={(e)=>setMatch(e.target.value)} className='p text-lg' name="" id="">
                      <option value='type_of_search=not_exact&'>Related Match</option>
                      <option value='type_of_search=exact&'>Exact Match</option>
                  </select>
                  </div>
                          </div>
                          <div className='flex justify-evenly'>
                   <button className=' bg-indigo-400  p text-xl rounded-lg' onClick={()=>handleFilter()}>Apply Filters</button>
                   <button className=' bg-indigo-400  p text-xl rounded-lg' onClick={()=>clearFilter()}>Clear Filter</button>
                          </div>
                </div>
            }
            {show ||
           <div className="text-gray-600 mx-auto space-y-2 pt-1 sm:space-y-0 md:grid md:grid-cols-2 gap-3">
           {data?.novels.map(item=>(
             <div className="grid grid-cols-4 mt-2">
               <Link className=' place-self-end' to={`/novel/${item.slug}`} >
               <img src={item.cover} className="h-32 w-24 rounded-lg" alt="" />
               </Link>
               <div className="mx-2 col-start-2 col-span-3">
                 <Link to={`/novel/${item.slug}`} className=" text-base line-clamp-1 font-semibold">{item.title}</Link>
                 <div className='flex items-center space-x-2 -my-1'>
        <ReactStars
             value={item.average}
             count={5}
             isHalf={true}
             edit={false}
             size={20}
             />
        <h1 className=' text-indigo-400'>({item.average}) {item.reviews}</h1>
             </div>
             <div className="flex items-center  ">
               <h1>Rank {item.rank}</h1>
               <div className="flex items-center ml-8 space-x-1" >
               <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
              </svg>
              <span>{item.chapters} Chapters</span>
               </div>
             </div>
 
 
             <div className="flex ">
             <div className='flex items-center  '>
             <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" />
             </svg>
             <h1>{item.comentarios} Com.</h1>
             </div>
                  <div className="flex ml-5 text-sm sm:text-base ">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
             </svg>
             <h1 className=' line-clamp-1'>
                     {moment.utc(item.updated).local().format('MMM d HH:mm:ss')}
             </h1>
                  </div>
             </div>
 
             <div className="flex text-sm sm:text-sm  ">
               Status:
             {item.status_name === "Completed" ?(
                 <div>
                   <p className="mx-2 text-green-600">{item.status_name}</p>
                 </div>
               ):(
                 <div>
                   <p className="mx-2 text-red-500">{item.status_name}</p>
                 </div>
               )}
             </div>
             
               </div>
 
             </div>
           ))}
           </div>
            }


                </div>
        </div>
    )
}

export default AdvancedFilter
