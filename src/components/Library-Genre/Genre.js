import { getFilter } from "../../actions/post";
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PaginationFilter from "./PaginationFilter";
import Ordering from "./Ordering";
import Category from "./Category";
import Status from "./Status";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));


const NovelsChapterz = ({ location }) => {
  const novels = useSelector(state => state.filter.novels);

  
  const dispatch = useDispatch();


  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  
  useEffect(()=>(
     dispatch(getFilter(location.search))
     ),[getFilter,location.search])
     
  return (
    <div className="bg-gray-900 h-full pb-96 pt-16">
      <div className=" text-gray-700 w-full md:w-3/4 mx-auto  space-x-4 space-y-5 lg:space-y-8">
        <Category location={location}/>
        <Status location={location}/>
        <Ordering location={location}/>
        <PaginationFilter location={location}/>
          <div className="text-gray-600  mx-auto grid sm:grid-cols-2 gap-3">
          {novels.map(item=>(
            <div className=" grid grid-cols-4">
              <Link className="col-start-1 place-self-end" to={`/novel/${item.slug}`} >
              <img src={item.cover} className="h-32 w-24 rounded-lg" alt="" />
              </Link>
              <div className="mx-2 col-start-2 col-span-3">
                <Link to={`/novel/${item.slug}`} className=" line-clamp-1 text-base font-semibold">{item.title}</Link>
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
                 <div className="flex ml-5">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
             <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
            </svg>
                   {moment(new Date(item.updated)).format('MMM d, HH:mm:ss')}
                 </div>
            </div>

            <div className="flex text-sm sm:text-base ">
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
      </div>
          </div>
  );
};

export default NovelsChapterz;
