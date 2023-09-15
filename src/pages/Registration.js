import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fireDb, app } from "../firebase.config";
import { setDoc, doc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useSelector((store) => store);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const register = () => {
    const auth = getAuth(app);
    dispatch({ type: "showLoading" });
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      
        const user = userCredential.user;

        const userData = {
          email: user.email,
          profilePicUrl: "",
          bio: "Hi, I am using sheygram lite",
        };
        setDoc(doc(fireDb, "users", user.uid), userData);
        dispatch({ type: "hideLoading" });
        toast.success('Registration Successful');
        navigate('/login')
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        toast.error("Something went wrong")
        console.log(error);
        
        
      });
  };
  useEffect(()=> {
    if(localStorage.getItem('sheygram-lite-user'))
    {
      navigate('/')
    }
  })
  return (
    <div className='h-screen flex justify-between flex-col overflow-x-hidden bg-primary'>
       { loading && <Loader />}
      <div className='flex justify-start'>
        <div className='h-40 bg-white w-96 transform -skew-x-[25deg] -ml-10 flex items-center justify-center '>
          <h1 className='text-center text-6xl font-semibold skew-x-[25deg] text-primary'>
            SHEY
          </h1>
        </div>
      </div>

      <div className='flex justify-center '>
        <div className='w-[420] flex flex-col space-y-5 card p-10'>
          <div></div>

          <h1 className='text-4xl text-white font-semibold'> Get ----- In</h1>
          <hr />
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400'
            placeholder='Email'
            autoComplete='off'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400'
            placeholder='Password'
          />
          <input
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='border border-gray-100 h-10 rounded-sm focus:border-gray-500 pl-5 bg-transparent text-gray-400'
            placeholder=' Confirm Password'
          />
          <div className='flex justify-end'>
            <button
              onClick={register}
              className='bg-white h-10 rounded-sm text-primary px-10'
            >
              REGISTER
            </button>
          </div>
          <hr />
          <Link to='/login' className='text-[14px]  text-white'>
            Alreday Registered? Click here to login
          </Link>
        </div>
      </div>

      <div>
        <div className='flex justify-end'>
          <div className='h-40 bg-white w-96 transform skew-x-[25deg] -mr-10 flex items-center justify-center '>
            <h1 className='text-center text-6xl font-semibold -skew-x-[25deg] text-primary'>
              GREY
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
