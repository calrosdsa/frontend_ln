import React,{useState,useEffect} from 'react'
import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import NextIcon from "@material-ui/icons/ChevronRight";
import Grid from "@material-ui/core/Grid";
import PreviousIcon from "@material-ui/icons/ChevronLeft";  
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
import useSWR from 'swr'
import { fetcher } from '../novel/Review'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { appendQuery,removeQuery } from "../../utils/utils";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(0.5)
  }
}));



function Tags({match, location}) {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  const [pageIndex, setPageIndex] = useState(1);
  const {data} = useSWR(`/novels/tag/${match.params.slug}/${location.search}&page=${pageIndex}`,fetcher)
  const classes = useStyles();
  
  var Buttons = [];
  if (data?.pages_count) {
    for (let i = 1; i < data?.pages_count + 1; i++ ) {
      Buttons.push(
        <Button
          key={i}
          variant="contained"
          color = 'primary'
          onClick={() => setPageIndex(i)}
          className={classes.button}
          size="small"
          color={i === pageIndex ? "default" : "default"}
        >
          
          {i}
        </Button>
      );
    }
  }
    
    return (
        <div className='bg-gray-900 pb-96 pt-10'>
            <div className='bg-gray-800 w-full p-1 lg:p-5 rounded-lg sm:w-5/6 lg:w-3/4 xl:w-8/12 mx-auto'>
                <h1 className=' uppercase text-gray-400 py text-2xl'>{match.params.slug} Tagged Light Novels</h1>
                <div className="text-2xl">
    <h1 className="border-b-2 w-40 pb-2 border-gray-400 text-gray-400">Sorted By</h1>
      <Button
        component={Link}
        to={appendQuery(location, { ordering: "-created" })}
        className={classes.button}
        color="primary"
        variant={data?.ordering === "-created" ? "contained" : "outlined"}
        >
        New
      </Button>
      <Button
        component={Link}
        to={appendQuery(location, { ordering: "-updated" })}
        className={classes.button}
        color="primary"
        variant={data?.ordering === "-updated" ? "contained" : "outlined"}
        >
        Updated
      </Button>
      <Button
        component={Link}
        to={appendQuery(location, { ordering: "-popular" })}
        className=''
        color="primary"
        variant={data?.ordering === "-popular" ? "contained" : "outlined"}
        >
        Popular
      </Button>
    </div>
                <div className='mt-10 '>
                      
<Grid container alignItems="star" justify="star">
        <Grid item>

            <Button
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={data?.previous === null}
            variant="contained"
            color = 'primary'
            className={classes.button}
            size="small"
            >
            <PreviousIcon />
          </Button>
          {Buttons}
          <Button
            disabled={data?.next === null}
            onClick={() => setPageIndex(pageIndex + 1)}
            variant="contained"
            color = 'primary'
            size="small"
            className={classes.button}
            >
            <NextIcon />
          </Button>
        </Grid>
      </Grid>

                </div>
                <div className='grid grid-cols-1 mt-4 md:grid-cols-2 mx-auto'>
                {data?.novels.map(item=>(
                      <div className="flex p">
                      <Link to={`/novel/${item.slug}`} >
                      <img src={item.cover} className="h-28 w-20 rounded-lg" alt="" />
                      </Link>
                      <div className="mx-2">
                        <Link to={`/novel/${item.slug}`} className=" text-base font-semibold">{item.title}</Link>
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
                    <div className="flex items-center text-sm pl-2 ">
                      <h1>Rank {item.rank}</h1>
                      <div className="flex items-center ml-8 space-x-1" >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                     <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
                     </svg>
                     <span>{item.chapters} Chapters</span>
                      </div>
                    </div>
        
        
                    <div className="flex  text-sm">
                    <div className='flex items-center text-sm  '>
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
                     {moment.utc(item.updated).local().format('MMM d, HH:mm:ss')}
                         </div>
                    </div>
        
                    <div className="flex text-sm ">
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
    )
}

export default Tags
