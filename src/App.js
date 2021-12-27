import { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Components
import axios from 'axios';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import Routes from './components/routing/Routes';
import Navbar from './components/layout/Navbar'
import Posts from './components/posts/Posts';
const App = () => {


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
    setTimeout(() => {
      store.dispatch(loadUser());
    }, 1000);
    axios.defaults.xsrfCookieName = 'csrftoken';
    axios.defaults.xsrfHeaderName = 'X-CSRFToken';
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
        <Navbar />
          <Switch>
            <Route exact path='/' component={Posts}/>
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
