import { Fragment, useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { auth } from '../firebase/firebase';

const Login = (props) => {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginForm = (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.length === 0) {
      alert('Sorry, some error occured!');
      return;
    }
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        props.history.push('/dashboard');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (user) return <p>You are already logged in</p>;

  return (
    <Fragment>
      <h3>Login</h3>
      <form onSubmit={loginForm}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        <button className='btn btn-primary my-4'>Login</button>
      </form>
    </Fragment>
  );
};

export default Login;
