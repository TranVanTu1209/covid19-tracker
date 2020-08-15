import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyC4Jz4e9zrXspI_wcfgTkRHek3K04Lm0so",
  authDomain: "covid19-tracker-c5e32.firebaseapp.com",
  databaseURL: "https://covid19-tracker-c5e32.firebaseio.com",
  projectId: "covid19-tracker-c5e32",
  storageBucket: "covid19-tracker-c5e32.appspot.com",
  messagingSenderId: "430762967514",
  appId: "1:430762967514:web:5e3232d5d982ce7dba80e3",
  measurementId: "G-MQYENTP4M2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;