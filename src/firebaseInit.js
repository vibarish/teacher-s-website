// import exp from 'constants';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0TzwMD-I4eIBFJd6rDM8bw_u2NSqWD7g",
    authDomain: "teacher-bab78.firebaseapp.com",
    databaseURL: "https://teacher-bab78.firebaseio.com",
    projectId: "teacher-bab78",
    storageBucket: "teacher-bab78.appspot.com",
    messagingSenderId: "58146608224",
    appId: "1:58146608224:web:f791ba60d316c94cfe5f05"

//   apiKey: "AIzaSyCOD7btxcDMqXOlcpNnC5K4c4bDL8qCZ_I",
//   authDomain: "vasiliy-s-blog.firebaseapp.com",
//   databaseURL: "https://vasiliy-s-blog-default-rtdb.firebaseio.com",
//   projectId: "vasiliy-s-blog",
//   storageBucket: "vasiliy-s-blog.appspot.com",
//   messagingSenderId: "432256825926",
//   appId: "1:432256825926:web:92fb8757d2b5d7a4b3a847",
//   measurementId: "G-E3TJW0XKYG"
};

export default firebase.initializeApp(firebaseConfig);
