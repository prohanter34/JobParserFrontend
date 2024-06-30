import React, { useEffect } from 'react';
import './App.css';
import { useLocation } from 'react-router-dom';
// import Auth from './Components/Auth/Auth';
import { useDispatch } from 'react-redux';
import Main from './Components/Main/Main';
// import { authByCookiesThunk } from './store/authReducer';

function App() {

  // const location = useLocation()
  // const dispatch = useDispatch<any>()

  // useEffect(() => {
  //   dispatch(authByCookiesThunk())
  // }, [])

  // if (location.pathname === "/auth/login" || location.pathname === "/auth/registration") {
    // return <Auth />
    // return(
    //   <div></div>
    // )
    return <Main />
  // } else {
  // }

}

export default App;
