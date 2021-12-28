import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout,loadUser } from '../../actions/auth';
import {  Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useDispatch } from 'react-redux';
import { setWebsockets } from '../../actions/webSockets'; 

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout,loadUser }) => {
  const [open, setOpen] = useState(false);
  const socketUrl = 'ws://127.0.0.1:8000/ws/notification/broadcast/'
  const [messageHistory, setMessageHistory] = useState([]);

  const dispatch = useDispatch()

  const {
    lastMessage,
    readyState,
  } = useWebSocket(socketUrl);
  
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory(prev => prev.concat(lastMessage));
      document.getElementById("notification-badge").innerHTML = parseInt(document.getElementById("notification-badge").innerHTML) + 1;
      Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(lastMessage.data))
    }
    }
  }, [lastMessage, setMessageHistory]);

  useEffect(() => {
    if (lastMessage !== null) {
        dispatch(setWebsockets(lastMessage.data))
    }
}, [dispatch, lastMessage])

 
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  
 
   
  const handleLogout = () => {
    setOpen(false);
    logout();
  };

  const authLinks = (
    <Fragment>

      <div className=' text-white text-xs z-50 hidden space-x-3 items-center md:flex ml-2 gap-x-1 '>
      <Link to='/notifications' className='flex'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <span id='notification-badge text-lg'>0</span> 
      </Link>
        <Link to='/library' className=''>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
        </Link>
       
        <Link
          to='/profile'
          className='bg-gray-800 hover:bg-gray-700 flex items-center
           text-white p rounded cursor-pointer text-base mr-6 hover:text-indigo-400'
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
         </svg>
         
          Profile
        </Link>
      </div>
      {/* Responsive Mobile Buttons */}
      <div className='flex justify-end mr-5 space-x-0 w-1/2 md:hidden'>
        <button
          onClick={() => setOpen(!open)}
          className='navbar-burger flex items-center text-gray-200 mr-2'
        >
          <svg
            className='block h-7 w-7 fill-current'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Mobile menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z'></path>
          </svg>
        </button>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div className='flex text-white text-sm font-bold ml-2 gap-x-3 md:gap-x-5 '>
      <Link
        className='bg-gray-900 hover:bg-gray-700 text-white p-1 rounded cursor-pointer hover:text-indigo-400'
        to='/login'
      >
        Login
      </Link>
      <Link
        className='bg-indigo-600 hover:bg-gray-700 text-white p-1 rounded cursor-pointer hover:text-indigo-200'
        to='/register'
      >
        Sign Up
      </Link>
    </div>
  );

  return (
    <>
      <header className='bg-gray-700   lg:max-w-full z-10 fixed inset-x-0  mx-auto'>
        <div className='flex w-full  sm:w-3/4  mx-auto h-16 md:h-16 bg-gray-700 p-1   justify-between items-center'>
        <Link
          className='text-white text-sm mr-4 md:text-lg flex font-bold justify-around items-center '
          to='/'
          >
          {' '}
          <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
          </svg>
        </Link>
          <div className=' items-center space-x-1 hidden lg:flex'>
            <Link className='flex' to='/search'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
       </svg>
       <h1 className='pr-4'>Search</h1>
            </Link>

       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <Link to='/genre/?ordering=-popular' className='pr-4'>Browse</Link>
      <Link to='/updates' className='flex items-center'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
             </svg>

          <h1 className='pr-4'>Updates</h1>
      </Link>
          <Link to='/tags' className='flex items-center '>

          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
         </svg>
         <h1 className='pr-4'>Tags</h1>
          </Link>
      <Link to='/filter' className='flex items-center'>
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
        </svg>
        <h1>Filter</h1>
      </Link>
            </div>

        <nav className='w-1/2 flex items-center justify-end'>
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
            </div>
      </header>
      {/* Put new Mobile menu below here */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog Dialog
            as='div'
            className='fixed inset-0 overflow-hidden'
            onClose={setOpen}
          >
            <div className='absolute inset-0 overflow-hidden'>
              <Transition.Child
                as={Fragment}
                enter='ease-in-out duration-500'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-500'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='absolute inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
              </Transition.Child>
              <div className='fixed inset-y-0 mt-16 right-0 pl-10 max-w-full flex'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full'
                  enterTo='translate-x-0'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0'
                  leaveTo='translate-x-full'
                >
                  <div className='relative max-w-xs'>
                    <Transition.Child
                      as={Fragment}
                      enter='ease-in-out duration-500'
                      enterFrom='opacity-0'
                      enterTo='opacity-100'
                      leave='ease-in-out duration-500'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <div className='absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4'>
                        <button
                          type='button'
                          className='rounded-md text-indigo-600 hover:text-white focus:outline-none focus:ring-2
                           focus:ring-indigo-300'
                          onClick={() => setOpen(!open)}
                        >
                          <span className='sr-only'>Close panel</span>
                          <XIcon className='h-6 w-6' aria-hidden='true' />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className='h-full flex flex-col py-6 bg-gray-800 shadow-xl overflow-y-scroll'>
                    <div className='flex space-x-4 items-center px-4 sm:px-6'>
                      <Dialog.Title className='text-2xl font-bold text-indigo-500'>
                        Welcome,{' '}
                        {user && (
                          <Link
                            onClick={() => setOpen(!open)}
                            className='text-indigo-500 cursor-pointer'
                            to={`/profile/${user.username}`}
                          >
                            {user.username.charAt(0).toUpperCase() +
                              user.username.slice(1)}
                          </Link>
                        )}
                      </Dialog.Title>
                    
                    </div>
                    <div className='mt-0 relative flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      <div className='flex flex-col justify-between h-full'>
                        <div>
                          <ul className=' space-y-4'>
                              <Link
                                onClick={() => setOpen(false)}
                                to='/profile'
                                className='p flex items-center text-sm font-semibold text-gray-400 
                                hover:bg-gray-900 space-x-3 hover:text-indigo-600 rounded'
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                             <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                                <h1>Profile</h1>
                              </Link>
                           
                              <Link onClick={() => setOpen(false)} className='p flex items-center text-sm font-semibold text-gray-400 
                                hover:bg-gray-900 space-x-3 hover:text-indigo-600 rounded' to='/search'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
       </svg>
       <h1 className='pr-4'>Search</h1>
            </Link>
      <Link onClick={() => setOpen(false)} to='/genre/?ordering=-popular' className='p flex items-center text-sm font-semibold text-gray-400 
                                hover:bg-gray-900 space-x-3 hover:text-indigo-600 rounded'>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
      <h1 className='pr-4'>Browse</h1>
      </Link>
      <Link to='/library' onClick={() => setOpen(false)}  className='p flex items-center text-sm font-semibold text-gray-400 
                                hover:bg-gray-900 space-x-3 hover:text-indigo-600 rounded'>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10.496 2.132a1 1 0 00-.992 0l-7 4A1 1 0 003 8v7a1 1 0 100 2h14a1 1 0 100-2V8a1 1 0 00.496-1.868l-7-4zM6 9a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1zm3 1a1 1 0 012 0v3a1 1 0 11-2 0v-3zm5-1a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clip-rule="evenodd" />
</svg>
          <h1>Library</h1>
        </Link>
       
      <Link onClick={() => setOpen(false)} to='/updates' className='p flex items-center text-sm font-semibold text-gray-400 
                                hover:bg-gray-900 space-x-3 hover:text-indigo-600 rounded'>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
             <path fill-rule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clip-rule="evenodd" />
             </svg>

          <h1 className='pr-4'>Updates</h1>
      </Link>
          <Link onClick={() => setOpen(false)} to='/tags' className='p flex items-center text-sm font-semibold text-gray-400 
                                hover:bg-gray-900 space-x-3 hover:text-indigo-600 rounded'>

          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
         </svg>
         <h1 className='pr-4'>Tags</h1>
          </Link>
      <Link onClick={() => setOpen(false)} to='/filter' className='p flex items-center text-sm font-semibold text-gray-400 
                                hover:bg-gray-900 space-x-3 hover:text-indigo-600 rounded'>
         <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
        </svg>
        <h1>Filter</h1>
      </Link>
                          </ul>
                        </div>
                        <div className='mt-auto'>
                          <div className='pt-6'>
                            <Link
                              onClick={() => setOpen(false)}
                              className='block p-1 mb-3 leading-loose text-xs text-center font-semibold bg-gray-900 hover:bg-gray-900 rounded-xl'
                              to='/settings'
                            >
                              Account Settings
                            </Link>
                            <a
                              onClick={() => handleLogout()}
                              href='#!'
                              className='block p-1 mb-2 leading-loose text-xs text-center text-white font-semibold bg-red-600 hover:bg-red-700  rounded-xl'
                            >
                              Log out
                            </a>
                          </div>
                          <p className='my-4 text-xs text-center text-gray-400'>
                            <span>
                              Copyright Created in React + Django
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* /End replace */}
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout,loadUser })(Navbar);
