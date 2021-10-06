import firebase from  'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/messaging';
const config= {
    apiKey: "AIzaSyACA_tUNaD5JY5F4hVaLMqW1KOqzbkwDTg",
    authDomain: "residentsconnect-ede18.firebaseapp.com",
    databaseURL: "https://residentsconnect-ede18-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "residentsconnect-ede18",
    storageBucket: "residentsconnect-ede18.appspot.com",
    messagingSenderId: "433575926608",
    appId: "1:433575926608:web:37b2c342c51b070975ea55",
    storageURL:"gs://residentsconnect-ede18.appspot.com"
  };


const app=firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();