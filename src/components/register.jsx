import { Fragment, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase/firebase';
import { AuthContext } from '../context/authContext';

const Register = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const register = (e) => {
    e.preventDefault();
    if (
      name.trim().length === 0 ||
      email.trim().length === 0 ||
      password.length === 0 ||
      date.length === 0 ||
      phone.trim().length === 0
    ) {
      alert(
        'Sorry, Error occured. Name, Email, Password, Date & Profession cannot be emply. Check your email so it is valid. Password must be at least 6 characters.'
      );
      return;
    }
    // Call the server

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          user.updateProfile({
            displayName: name,
            photoURL: phone,
          });

          localStorage.setItem('id', user.uid);

          db.collection('user')
            .add({ name, email, phone, date, id: user.uid })
            .then(() => {
              console.log('added');
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });

    console.log(name, email, password, date, phone);

    console.log(user);
  };

  //if (loading) return <p>Loading...</p>;

  return (
    <Fragment>
      <h3>Register</h3>
      <form onSubmit={register}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            className='form-control'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>

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

        <div className='form-group'>
          <label htmlFor='date'>Date of Birth</label>
          <input
            type='date'
            className='form-control'
            value={date}
            onChange={(e) => setDate(e.currentTarget.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input
            type='number'
            className='form-control'
            value={phone}
            onChange={(e) => setPhone(e.currentTarget.value)}
          />
        </div>

        <button className='btn btn-primary my-4'>Register</button>
      </form>

      <Link to='/login'>Already registered?</Link>
    </Fragment>
  );
};

export default Register;
