import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentAccount} from '../slice/accountSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import userApi from '../api/userApi';

const Login = () => {
    // const account = useSelector(state => state.account.value);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        axios.get(userApi)
        .then(res => {
            res.data.forEach(user => {
                if(user.username === username && user.password === password){
                    const accountToSet = {id: user.id, username: user.username, password: user.password};
                    dispatch(setCurrentAccount(accountToSet));
                    console.log('Login Successful');
                    setTimeout(() => {
                        nav('/')
                    }, 3000);
                }else{
                    console.log('Wrong username or password');
                }
            })
        })
        .catch(err => console.error(err));
    }

  return (
    // <div className='container'>
    //     <div className="row">
    //         <div className="col-12">
    //             <h1 className='texxt-center'>Login</h1>
    //         </div>
    //     </div>
    //     <div className="row">
    //         <div className="col-12">
    //             <form onSubmit={handleLogin}>
    //                 <div className="row">
    //                     <div className="input-group col-12">
    //                         <label htmlFor="username" className='form-label'>Username</label>
    //                         <input type="text" name='username' id='username' className='form-control' ref={usernameRef} required/>
    //                     </div>
    //                     <div className="input-group col-12">
    //                         <label htmlFor="password" className='form-label'>Password</label>
    //                         <input type="password" name='password' id='password' className='form-control' ref={passwordRef} required/>
    //                     </div>
    //                 </div>
    //                 <div className="row">
    //                     <div className="col-8">
    //                         <p>Don't have account</p>
    //                         <Link to='/register'>Register</Link>
    //                     </div>
    //                     <div className="col-4">
    //                         <button className='btn btn-primary'>Login</button>
    //                     </div>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    //     <div className="row">

    //     </div>
    // </div>
    <main className='login'>
            <h1 className='loginTitle'>Login</h1>
            <form className='loginForm'  onSubmit={handleLogin}>
                <label htmlFor='email'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    ref={usernameRef}
                    required
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    ref={passwordRef}
                    required
                />
                <button className='loginBtn'>SIGN IN</button>
                <p>
                    Don't have an account? <Link to='/register'>Create one</Link>
                </p>
            </form>
        </main>
  )
}

export default Login