import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCfLs0gbwhBBoKEksNxWbTiKwKMCCcnS1w',
  authDomain: 'integrate-api-353c3.firebaseapp.com',
  projectId: 'integrate-api-353c3',
  storageBucket: 'integrate-api-353c3.appspot.com',
  messagingSenderId: '2815239648',
  appId: '1:2815239648:web:7ff1284142b23c8afb7785',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
