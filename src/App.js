import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/register';
import Login from './components/login';
import Dashboard from './components/dashboard';
import { AuthContext } from './context/authContext';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className='container'>
      <h3 className='text-center'>Integrate API</h3>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/login' component={Login} />
        {user && <Redirect from='/' to='/dashboard' />}
        <Route exact path='/' component={Register} />
      </Switch>
    </div>
  );
}

export default App;
