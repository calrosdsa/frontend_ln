import React,{useMemo,useState,useRef} from 'react'
import {XIcon} from '@heroicons/react/solid'
import useSWR from 'swr'
import { fetcher } from '../novel/Review'
import Autocomplete from './Autocomplete'
import { useHistory } from 'react-router-dom'
import NovelItem from '../posts/NovelItem'
function Search() {
    const {data} = useSWR('http://127.0.0.1:8000/novels/allnovels/',fetcher,{revalidateIfStale:false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false})
    const history = useHistory()
    const [wordEnter, setWordEnter] = useState('')
    const [showInput,setShowInput]=useState(false)
    const [cursor,setCursor]=useState(-1)
    const searchResultRef = useRef(null);
    const searchContainer = useRef(null);


    
  //  useEffect(() => {
    //    window.addEventListener("mousedown", handleClickOutside);

      //  return () => {
        //    window.removeEventListener("mousedown", handleClickOutside);
        //};
    //}, []);
    
  


    

    const suggestions = useMemo(()=>{
        if (!wordEnter)
        return []
        return data?.allnovels.filter(post=>post.title.toLowerCase().includes(wordEnter.toLowerCase()))
    },[data?.allnovels,wordEnter])
    const cleanInput=()=>{
        setWordEnter('')
    }
    const inputF =()=>{
    
        setShowInput(true)
      }
    

    const keyboardNavigation =(e)=>{
        if(e.key ==="ArrowDown"){
          setCursor(c => (c <  suggestions.length -1 ? c + 1 : c))
        }
        if(e.key ==="ArrowRight"){
            setCursor(c => (c <  suggestions.length -1 ? c + 1 : c))
          }
        if(e.key ==="ArrowUp"){
          setCursor(c=>(c > 0 ? c -1: 0));
        } 
        if(e.key ==="ArrowLeft"){
            setCursor(c=>(c > 0 ? c -1: 0));
          }
        
        if(e.key ==="Escape"){
          setWordEnter('')
       }
       if(e.key ==="Enter"){
          setWordEnter(suggestions[cursor].title);
          history.push(`/novel/${suggestions[cursor].slug}`)
       }
      }
    return (
        <div className='bg-gray-900' ref={searchContainer} >
            <div className='bg-gray-800   w-full sm:w-5/6 md:w-3/4 lg:w-3/5 mx-auto'>
           <div className='pt-20 relative'>
           <input 
           onKeyDown={e=>keyboardNavigation(e)}
           onInput={inputF}
           value={wordEnter} onChange={e=>setWordEnter(e.target.value)} type="text" placeholder='Search Light Novel by Title '
           className=' border-1  text-gray-200 px-2 h-12 outline-none border-gray-600  rounded-xl  w-4/5 mx-auto flex  placeholder-gray-200' />
             {wordEnter&&<XIcon className="h-16 top-20 -mt-2  text-gray-200  p-1 absolute right-10 sm:right-16 lg:right-28"
              onClick={cleanInput}/>}
           </div>
           <div className='h-full grid mt-4 grid-cols-1 md:grid-cols-2 pb-16'>
               {showInput&&
            suggestions.map((item,idx)=>(
                <ul ref={searchResultRef} className='py'>
                    <Autocomplete 
                    key={item.id}
                
                    onSelectItem={()=>{
                      setWordEnter(item.slug);
                    }}
                      isHighLighned={cursor ===idx? true :false}
                      {...item}
                    />
                </ul>

))}
                </div>
                <h1 className='text-gray-400 font-semibold text-2xl px-10 border-b-2 border-gray-400  my-1'>Some Popular Novels</h1>

                <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 pb-20 3xl:grid-cols-6'>
                {data?.popular.map(post=>(
                    <div >
                       <NovelItem post={post}/>
                    </div>
                ))}
                </div>

            </div>
        </div>
    )
}

export default Search
