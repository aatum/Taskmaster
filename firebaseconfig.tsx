// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBP0MU26yV9x99FXtniA6L2Y9ORaZPB6I4",
  authDomain: "taskmaster-4c9c2.firebaseapp.com",
  projectId: "taskmaster-4c9c2",
  storageBucket: "taskmaster-4c9c2.appspot.com",
  messagingSenderId: "612072118250",
  appId: "1:612072118250:web:7322aa28c609b5474b4493",
  measurementId: "G-97VLJ5NVQB",
  databaseURL: "https://taskmaster-4c9c2-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const database = getDatabase(app)
export const reference = ref(database, '/tasks')



