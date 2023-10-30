import Unify from "./components/Unify";
import './App.css'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./feature/userSlice";
import Login from "./components/auth/Login";
// import SignUp from "./components/auth/SignUp";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import SignUp from "./components/auth/SignUp";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        dispatch(
          login({
            userName: authUser.displayName,
            photo: authUser.photoURL,
            email: authUser.email,
            uid: authUser.uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);
  return (
    <div className="App">
      {
        user ?(<Unify />) :<Login />
      }
      {/* <>
      <Router>
        <Link to={'/sign-in'}></Link>
        <Link to={'/'}></Link>
      
      <Routes>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
      </Router>
      </> */}

    </div>
  );
}

export default App;
