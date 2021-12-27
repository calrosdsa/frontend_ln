import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileForm from '../profile/ProfileForm';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useSWR from 'swr'
import { connect } from 'react-redux';
import { fetcher } from '../novel/Review' 
import ReactLoading from 'react-loading'
import { logout } from '../../actions/auth';


const PrivateRoute = ({
  name,
  component: Component, 
  auth: { isAuthenticated, loading, user },
  logout,

  ...rest
}) => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  const {data,mutate} = useSWR('profile/me', fetcher)
   
  const handleLogout = () => {
    logout();
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/' />
          ) : (
            <Fragment>

            {!data? (
              <div className='w-full h-screen  bg-gray-800 flex  justify-center sm:pt-32 md:pt-36 '>
              <ReactLoading type='bars' color='#fff' width={300} />
            </div>
            ):(
              
              <div className=' p-0 md:p-16  bg-gray-900 '>
              <div className=' pb-20 w-full sm:w-5/6 lg:w-3/4 xl:w-4/6  mx-auto gap-x-2 '>
              <Link
              to='/'
              className='flex items-center w-30 md:w-48  justify-center mb-2 md:mb-0 bg-indigo-600 md:px-6 md:py-3 px-10 py-0 h-12 text-sm shadow-sm font-medium tracking-wider text-white rounded-xl hover:shadow-lg hover:bg-indigo-500'
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
              <div className="bg-gray-900  mx-2">
              <div className="space-x-4 flex py-10 px-3">
              <img src={data?.avatar} className="h-20 w-20" alt="" />
              <div>
              
              <h1>{data?.name}</h1>
              {user === null || loading ?
                
                <div className="flex items-center">
                
                </div>
                :
                <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <h1>{user.email}</h1>
                </div>
              }
              <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
              </svg>
              <h1>Reader</h1>
              </div>
              </div>
              </div>
              <div className="grid  grid-cols-3 gap-2 p">
              <div className="bg-gray-500 rounded-xl p ">
              Settings
                </div>
                <Link to = '/library'>
                <div className="bg-gray-500 rounded-xl p">
                Library
                </div>
                </Link>
                <Link to={`/history`}>
                <div className="bg-gray-500 rounded-xl p">
                History
                </div>
                </Link >
                <Link to='comment-user' className="bg-gray-500 rounded-xl p">
                Comments
                </Link>
                <Link to='/review-user' className="bg-gray-500 rounded-xl p">
                Reviews
                </Link>
                <div className="bg-gray-500 rounded-xl p">
                Inbox
                </div>
                
                </div>
                <ProfileForm data={data} mutate={mutate}/>
                </div>
                <div className="-mt-20">
                </div>
                </div>
                <a
                              onClick={() => handleLogout()}
                              href='/'
                              className='block p-1 mb-2 w-1/3 mx-auto mt-20 leading-loose text-xs text-center text-white font-semibold bg-red-600
                               hover:bg-red-700  rounded-xl'
                            >
                              Log out
                            </a>
                </div>
                
                ) }
          </Fragment>
              )
            }
            />
            );
          };
          
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
 });

export default connect(mapStateToProps,{logout})(PrivateRoute);
