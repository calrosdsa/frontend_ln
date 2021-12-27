import PropTypes from 'prop-types'
import { getLibrary } from '../../actions/profile'
import { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

const Library=({
    profile:{ library, loading},
    getLibrary,
    auth

})=>{
    useEffect(() => {
        if (!library) getLibrary();
    
      }, [getLibrary, library]);


    return(
        <Fragment>
         {library === null || loading ? (
        <div className=''>
          <ReactLoading type='bars' color='#fff' width={300} />
        </div>
      ) : (
            <div className="pt-40 flex flex-col bg-gray-900  h-screen w-full">
                
                {library.user}
                <div className="grid grid-cols-7 ">
                    <p className="text-base col-start-2 border-b-2 border-gray-400 pb-2 col-span-2 font-bold text-gray-100">Novel Title</p>
                    <p className="text-base col-start-4 font-bold border-b-2 border-gray-400 pb-2 text-gray-100">Progress</p>
                    <p className="text-base col-start-5 font-bold border-b-2 border-gray-400 pb-2 text-gray-100">Status</p>
                    <p className="text-base col-start-6 font-bold border-b-2 border-gray-400 pb-2 text-gray-100">Actions</p>


                {library.map((nov)=>(
                    <div className=" p border-b-2 border-gray-500 col-start-2 col-span-5">

                    <div className="col-start-2 col-span-2    ">
                        <div className="flex items-start ">
                    <img className="w-12  h-16" src={nov.cover} alt="" />
                    <h1 className="text-lg ml-2 mt-1 font-bold text-gray-400">{nov.title}</h1>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            </div>
     
      )}
        </Fragment>
    )
}

Library.propTypes={
    library: PropTypes.object.isRequired,
    getLibrary: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
    profile : state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getLibrary})(Library)