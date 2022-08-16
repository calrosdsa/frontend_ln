import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
  import PrivateRoute from './PrivateRoute';
import Posts from '../posts/Posts'
import Novel from '../novel/Novel'
import ReplyComment from '../novel/ReplyComment';
import Comment from '../novel/Comment';
import Library from '../Library-Genre/Library';
import NovelsChapter from '../novel/NovelsChapter';
import Genre from '../Library-Genre/Genre';
import Tags from '../Library-Genre/Tags';
import Review from '../novel/Review';
import History from '../hist-not.py/History';
import Notification from '../notifications.py/Notification';
import Chapter from '../novel/Chapter';
import Search from '../Library-Genre/Search';
import FilterTag from '../Library-Genre/FilterTag';
import Updated from '../novel/Updated';
import AdvancedFilter from '../Library-Genre/AdvancedFilter';
import CommentUser from '../profile/CommentUser';
import ReviewUser from '../profile/ReviewUser';
const Routes = () => {  
  return (
    <section className=''>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/posts'  component={Posts} />
        <Route exact path='/novel/:slug' component={Novel}/>
        <Route exact path='/comment/:id' component={Comment}/>
        <Route exact path='/library' component={Library}/>
        <Route exact path='/chapters/:slug' component={NovelsChapter}/>
        <Route exact path='/genre' component={Genre}/>
        <Route exact path='/tag/' component={Tags}/>
        <Route exact path='/reviews/:slug' component={Review}/>
        <Route exact path='/history' component={History}/>
        <Route exact path='/search' component={Search}/>
        <Route exact path='/notifications' component={Notification}/>
        <Route exact path='/chapter/:slug' component={Chapter}/>
        <Route exact path='/tags' component={FilterTag}/>
        <Route exact path='/updates' component={Updated}/>
        <Route exact path='/filter' component={AdvancedFilter}/>
        <Route exact path='/comment-user' component={CommentUser}/>
        <Route exact path='/review-user' component={ReviewUser}/>

        




    
        <PrivateRoute
          exact
          path='/profile'
          name='Profile'
        />

      </Switch>
    </section>
  );
};

export default Routes;
