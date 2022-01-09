import { Fragment, useEffect,useState } from 'react'
import LibraryItem from './LibraryItem'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import Button from "@material-ui/core/Button";
import { appendQuery,removeQuery } from '../../utils/utils'
import ReactLoading from 'react-loading'
import { fetcher } from '../novel/Review'
import { useHistory } from 'react-router-dom'
const Library=({
    auth,
    location
})=>{
      const {data,mutate} = useSWR(`novels/library/${location.search}`,fetcher)
      const history =useHistory()
      const [open , setOpen] = useState(false)

    return(
        <Fragment>
         {auth === null ? (
        <div className=''>
          <ReactLoading type='bars' color='#fff' width={300} />
        </div>
      ) : (
            <div className="pt-40 flex flex-col bg-gray-900  h-full pb-72 w-full">
                <div className='sm:w-11/12 xl:w-4/6 mx-auto bg-gray-800 p-1 px-3 pt-2 rounded-lg'>
                <Link
              to='/'
              className='flex pb100 items-center w-30 md:w-48  justify-center mb-2  bg-indigo-600 md:px-6 
              md:py-3 px-10  h-12 text-sm shadow-sm font-medium  text-white rounded-lg hover:shadow-lg
               hover:bg-indigo-500'
              >
              {' '}
              <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3 w-3 text-white mr-1'
              viewBox='0 0 20 20'
              fill='currentColor'
              >
              <path
              fillRule='evenodd'
              d='M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z'
              clipRule='evenodd'
              />
              </svg>
              Back to Home
              </Link>
                <h1 className='text-xl font-bold text-gray-400'>Your Bookmarked Novel Library</h1>
                <p className=' text-gray-500'>The list of novels you subscribe to follow.
You can organize your library and discover the latest updates of your favorite novels.</p>
                 <div className='bg-black my-1 rounded-lg p  space-y-2'>
                <div className='flex space-x-3 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" class=" h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
               <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
               </svg>
               <h1 className='text-xs  sm:text-sm '> Bookmark your favorite novels in your library.</h1>
                </div>
                <div className='flex space-x-2 items-start'>
            
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 sm:h-5 sm:w-5 md:h-4 md:w-4 " viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
               </svg>
               <p className=' text-xs  sm:text-sm  '> A maximum of 20 favorites can be selected.
                 You will only receive notifications
                for the books you selected as favorites.</p>
                </div>
                <div className='flex space-x-2 items-start'>
            
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
           <p className=' text-xs  sm:text-sm '>You can mark the novels you have completed reading. You will not receive notifications for such novels.</p>
            </div>
                 </div>

                <div className="sm:px-10 md:px-2 lg:px-10 pt-10">
                    <div className=' space-x-3 sm:space-x-5 pb-3 '>
                    <Button
                    component={Link}
                    to={appendQuery(location, {options : '3'})}
                    color="primary"
                    variant={data?.options === "3" ? "contained" : "outlined"}
                   >
                       Favorites
                   </Button>
                   <Button
                    component={Link}
                    to={appendQuery(location, {options : "2"})}
                    color="primary"
                    variant={data?.options === "2" ? "contained" : "outlined"}
                   >
                       Completed
                   </Button>
                   <Button
                    component={Link}
                    to={appendQuery(location, {options : ""})}
                    color="primary"
                    variant={data?.options ===  "" ? "contained" : "outlined"}
                   >
                       All
                   </Button>

                    </div>
                    <div className=' flex space-x-5 py-1'>
                    {data?.ordering === "-updated" ?
                        <Link  to={appendQuery(location, {ordering : "-updated"})} 
                        className='bg-gray-100 text-blue-600  space-x-2 text-sm px-3 flex items-center'>Last Updated
                         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                        </Link>
                        :
                        <Link to={appendQuery(location, {ordering : "-updated"})}  
                        className='bg-white text-sm px-5 flex items-center'>Last Updated</Link>
                    }
                        {data?.ordering === "-added" ?
                        <Link to={appendQuery(location, {ordering : "-added"})} 
                        className='bg-gray-100 text-blue-600 space-x-2 text-sm px-3 flex items-center'>
                            Last Added
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 font-bold" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                            </Link>
                        :
                        <Link to={appendQuery(location, {ordering : "-added"})}  
                        className='bg-white text-sm px-5 flex items-center'>Last Added</Link>
                    }
                    </div>
                    <div>

                    </div>
                    <div className='hidden border-b-2 border-gray-400 pb-1 md:grid md:grid-cols-5 md:place-items-center'>
                    <h1 className=' col-span-2 place-self-start'>Novel Title </h1>        
                    <h1>Progress</h1>
                    <h1>Status</h1>
                    <h1>Actions</h1>
                    </div>
                {data?.results.map((nov)=>(
                   <LibraryItem key={nov.id} mutate={mutate} data={data} open={open} setOpen={setOpen} nov = {nov}/>
                ))}
                </div>
                </div>
            </div>
     
      )}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Library)