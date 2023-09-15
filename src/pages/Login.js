import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app, fireDb } from "../firebase.config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


function Login() {
    const { loading }  = useSelector(store=>store) 
    const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const login = () => {
    dispatch({type : 'showLoading'})
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getDoc(doc(fireDb, "users", user.uid)).then((user) => {
          localStorage.setItem(
            "Sheygram-lite-user",
            JSON.stringify({ ...user.data(), id: user.id })
          );
          toast.success("Login Successful");
        });
        dispatch({type : 'hideLoading'})
        navigate("/")
      })
      .catch((error) => {
        toast.error("Login Failed");
        dispatch({type : 'hideLoading'})
      });
  };
  useEffect(()=> {
    if(localStorage.getItem('sheygram-lite-user'))
    {
      navigate('/')
    }
  })
  return (
    <div className='h-screen flex justify-between flex-col overflow-x-hidden'>
     { loading && <Loader />}
      <div className='flex justify-start'>
        <div className='h-40 bg-primary w-96 transform -skew-x-[25deg] -ml-10 flex items-center justify-center '>
          <h1 className='text-center text-6xl font-semibold skew-x-[25deg] text-white'>
            SHEY
          </h1>
        </div>
      </div>

      <div className='flex justify-center'>
        <div className='w-[420] flex flex-col space-y-5 card p-10'>
          <div></div>

          <h1 className='text-4xl text-primary font-semibold'> Get ----- In</h1>
          <hr />
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5'
            placeholder='Email'
            autoComplete='off'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5'
            placeholder='Password'
          />
          <div className='flex justify-end'>
            <button
              className='bg-primary h-10 rounded-sm text-white px-10'
              onClick={login}
            >
              LOGIN
            </button>
          </div>
          <hr />
          <Link to='/register' className='text-[14px]  text-primary'>
            Not Yet Registered? Click here to Register
          </Link>
        </div>
      </div>

      <div>
        <div className='flex justify-end'>
          <div className='h-40 bg-primary w-96 transform skew-x-[25deg] -mr-10 flex items-center justify-center '>
            <h1 className='text-center text-6xl font-semibold -skew-x-[25deg] text-white'>
              GREY
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
