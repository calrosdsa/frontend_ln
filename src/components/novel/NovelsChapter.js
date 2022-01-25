import { formatDistanceToNow } from 'date-fns'
import moment from 'moment'
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import NextIcon from "@material-ui/icons/ChevronRight";
import PreviousIcon from "@material-ui/icons/ChevronLeft";
import { useState,useEffect, Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "./Review";
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(0.5)
  }
}));

const NovelsChapters = ({ history, location,match }) => {
  const [pageIndex, setPageIndex] = useState(1);
  const {data}  = useSWR(`https://light-nvls.herokuapp.com/novels/novel_chapter/${match.params.slug}/?page=${pageIndex}`, fetcher )
  
  const classes = useStyles();  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  
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
          color={i === pageIndex ? "inherit" : "default"}
        >
          
          {i}
        </Button>
      );
    }
  }

  
  return (
    <Fragment>
    {data?
      <div className="bg-gray-900   w-screen pb-96  pt-32 mx-auto">
      <div className= 'w-full px-4 sm:w-4/5 xl:w-4/6 mx-auto flex flex-col '>
        <div className='bg-gray-800 p-2 rounded-xl'>
        <div className='flex space-x-4 lg:space-x-6 border-b-2 pb-3 border-gray-400'>
        
        <img src={data?.novel.cover} className='h-32 w-24 rounded-lg' alt="" />
        <div>
          <Link to={`/novel/${encodeURIComponent(data?.novel.slug)}`} className=' text-2xl text-indigo-300 font-medium mt-2 '>{data?.novel.title}</Link>
          <h2 className=' text-gray-400 mt-2'>Update
          {moment(data?.novel.updated).format('MMM,DD h:mm')}
          
          </h2>
          <h1 className=' text-gray-400 -mt-1'>Status: {data?.novel.statuss}</h1>
          </div>
          </div>
          
          <h1 className='text-gray-400 text-2xl '>  {data?.novel.title} Novel Chapters</h1>
           <p className='text-gray-400'>List of most recent chapters published for {data?.novel.title} novel. A total of {data?.novel.chapters} chapters
              have been translated and the release date of the last chapter is  { ' '}
              {formatDistanceToNow(
            new Date(moment.utc(data?.novel.updated).local().format()),
            {
              addSuffix:true
            }
            )}
              </p>
              
              </div>
              
              <div className='my-1 bg-gray-800 p-1 rounded-xl mt-10'>
              
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
          {location.search}
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
        
      <div className="lg:grid lg:grid-cols-2 my-1 space-y-5 md:space-y-0 ">
      
         {data?.chapters.map((item)=>(
           <Link key={item.id} className='my cursor-pointer border-b-2 border-gray-500 w-3/4 pb-1 '
           to={(`/chapter/${encodeURIComponent(item.slug)}`)}>
                <div className='flex space-x-5 mt-2'>
              <h1 className='px-3 text-gray-400 text-lg font-semibold'>{item.number}</h1>
              <div className=''>
             <h2 className=' line-clamp-1'>{item.title}</h2>
             <h2 className='text-gray-400 text-sm'>{formatDistanceToNow(
               new Date(moment.utc(item.created_at).local().format()),
               {
                 addSuffix: true,
                }
                )}</h2>
                </div>
                </div>
                </Link>
           ))}
           </div>
           </div>
           
           
          </div>
          </div>
          :
         <div className='bg-gray-900 h-screen'>...loading</div>
        }
        </Fragment>
  );
};

export default NovelsChapters;
