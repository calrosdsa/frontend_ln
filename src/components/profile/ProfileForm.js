import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link,Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const initialState = {
  bio: '',
  avatar: null,
  name: '',
};

const ProfileForm = ({
  auth: { user },
  mutate,
  data,
}) => {
  
  const [formData, setFormData] = useState(initialState);
  
  const [contentBase64, setContentBase64] = useState(data?.avatar);

  const { bio, name } = formData;

  const onChange = (e) =>{
    if (e.target.files && e.target.files[0]) {
         setContentBase64(URL.createObjectURL(e.target.files[0]))
   }
    
    setFormData({
      ...formData,
      [e.target.name]:
      e.target.name === 'avatar' ? e.target.files[0] : e.target.value,
    });
  }
  
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const onSubmit = async(e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append('bio', formData.bio);
    uploadData.append('name', formData.name);
    if (typeof formData.avatar === 'string') {
      uploadData.append('avatar', ''); // the empty field tells Django backend to NOT change the avatar field in the DB
    } else {
      uploadData.append('avatar', formData.avatar, formData.avatar.name);
    } 

    mutate({...data})
    await axios.post('/profile/',uploadData)
    mutate({...data})
    setFormData(initialState)
  };
  
  return (
    <div className='max-w-2xl h-screen mx-auto w-full  space-y-8 p-10 mt-10 bg-gray-800  shadow-lg z-10'>
      <div className='grid  gap-8 grid-cols-1'>
        <div className='flex flex-col '>
          <div className='flex flex-col sm:flex-row items-center'>
              <h2 className='font-semibold text-4xl mr-auto'>
                Edit Your Profile
              </h2>
            <div className='w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0'></div>
          </div>
          <div className='mt-5'>
            <form onSubmit={onSubmit}>
              <div className='md:flex flex-col items-center md:space-x-8 w-full text-xs'>
                <div className='md:space-y-0 mb-3'>
                  <label className='text-xl font-semibold px-1'>
                    Upload your own avatar
                    <abbr className='hidden' title='required'>
                      *
                    </abbr>
                  </label>
                  <div className='flex flex-col space-y-10 items-center py-1'>
                    <div className='w-40 h-40 mr-4 flex-none rounded-xl border overflow-hidden'>
                        <img
                          className='w-40 h-40 mr-4 object-cover'
                          src={contentBase64}
                          alt='Avatar Upload'
                        />
                    </div>
                    <label className='cursor-pointer '>
                      <span className='focus:outline-none  text-white text-sm py-4 px-4 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg'>
                        Browse
                      </span>
                      <input
                        disabled={
                          user && user.username == 'guest' ? true : false
                        }
                        type='file'
                        name='avatar'
                        onChange={onChange}
                        className='hidden'
                        
                      />
                    </label>
                  </div>
                </div>
                <div className='mb-3 space-y-2 w-full text-sm'>
                  <label className='text-xs font-semibold px-1'>
                    Name <abbr title='required'>*</abbr>
                  </label>
                  <input
                    className='w-full -ml-2 p-1 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-indigo-600'
                    required='required'
                    type='text'
                    placeholder={data?.name}
                    name='name'
                    value={name}
                    onChange={onChange}
                  />
                  <p className='text-red text-xs hidden'>
                    Please fill out this field.
                  </p>
                </div>
              </div>
              <div className='mb-3 space-y-2 w-full text-sm'>
                
              </div>
              <div className='flex-auto w-full mb-1 text-sm space-y-2'>
                <label className='text-xs font-semibold px-1'>
                  Bio <abbr title='required'>*</abbr>
                </label>
                <textarea
                  required='required'
                  className='w-full h-28 p-1 mb-3 rounded-lg border-2 bg-gray-900 border-gray-200 outline-none focus:border-indigo-600'
                  placeholder={data?.bio}
                  name='bio'
                  value={bio}
                  onChange={onChange}
                ></textarea>
             
              </div>
              <p className='text-xs text-red-500 text-right my-0'>
                Required fields are marked with an asterisk{' '}
                <abbr title='Required field'>*</abbr>
              </p>
                <button
                  disabled={user && user.username == 'guest' ? true : false}
                  type='submit'
                  className='mb-2 md:mb-0 bg-indigo-600 md:px-6 md:py-3 px-5 py-2 text-sm shadow-sm font-medium 
                  tracking-wider text-white rounded-full hover:shadow-lg hover:bg-indigo-500'
                >
                  {user && user.username == 'guest' ? (
                    <>Sorry, Guests cannot edit</>
                  ) : (
                    <>Save Changes</>
                  )}
                </button>
              <div className='mt-5 text-right md:space-x-3 md:block flex flex-col-reverse'>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileForm.propTypes = {
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(
  ProfileForm
);
