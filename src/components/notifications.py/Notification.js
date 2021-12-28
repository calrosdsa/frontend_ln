import React, {Fragment } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

const Notification = ({auth:{user,loading}}) => {
  //Public API that will echo messages sent to it back to the client

  const initialValue = JSON.parse(localStorage.getItem("notifications")|| "[]");
  
    //document.querySelector('#chat-log').value += (data.message + '\n');

  return (
    <Fragment>
        {user === null || loading  ? (
          <div className='bg-gray-600 w-screen h-screen mt-40'>
          Your cart is empty {}<Link to='/'>Go Back</Link>
          </div>
          ) : (
            <div className='bg-gray-400 mx-auto h-screen w-scrren mt-20'>
            {initialValue.map((item)=>(
              <div>{item.notifications}100
          <img className='h-32 w-20' src={item.image} alt="" />
          </div>
        ))}sasas
        </div>
        )}
      
        </Fragment>
  );
};
Notification.propTypes = {
  auth: PropTypes.object.isRequired
}
const mapStateProps =(state)=> ({
  auth: state.auth
})
export default connect(mapStateProps)(Notification);