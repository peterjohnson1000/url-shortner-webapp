import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDX6DU4gKpeC2rTi6Sr0QMIP3b5MvKR1SE",
  authDomain: "url-shortner-c6c3d.firebaseapp.com",
  databaseURL: "https://url-shortner-c6c3d-default-rtdb.firebaseio.com",
  projectId: "url-shortner-c6c3d",
  storageBucket: "url-shortner-c6c3d.appspot.com",
  messagingSenderId: "585678184933",
  appId: "1:585678184933:web:f2fdcda657400fdd148f0c",
  measurementId: "G-488SZE9P1J"
};
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

