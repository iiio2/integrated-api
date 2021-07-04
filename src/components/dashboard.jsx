import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/authContext';
import { db, auth } from '../firebase/firebase';

const Dashboard = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);

  const getDetail = () => {
    if (user && user.uid) {
      setLoading(true);
      db.collection('user')
        .where('id', '==', user.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setDetails(doc.data());
            setLoading(false);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getDetail();
  }, [user]);

  if (loading) return <p>loading...</p>;

  if (!details.email) return <p>No profile found!</p>;

  const signOutUser = () => {
    auth
      .signOut()
      .then(() => {
        alert('You are logged out');
        window.location.href = '/';
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className='dashboard'>
      <div className='row'>
        <div className='col-sm-8'>
          <h3>Dashboard</h3>
          <h4>Name: {details.name}</h4>
          <h4>Email: {details.email} </h4>
          <h4>Phone: {details.phone} </h4>
          <h4>Date of Birth: {details.date} </h4>
        </div>

        <div className='col-sm-4'>
          <button onClick={signOutUser} className='btn btn-secondary'>
            Signout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
