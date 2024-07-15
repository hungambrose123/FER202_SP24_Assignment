import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setCurrentAccount} from '../slice/accountSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import userApi from '../api/userApi';

const Login = () => {
    // const account = useSelector(state => state.account.value);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const {id: postId} = useParams();

    const handleLogin = (e) => {
        e.preventDefault();
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        axios.get(userApi)
        .then(res => {
            res.data.forEach(user => {
                if(user.username === username && user.password === password){
                    const accountToSet = {id: user.id, username: user.username, password: user.password, avatar: user.avatar};
                    dispatch(setCurrentAccount(accountToSet));
                    alert('Login Successful');
                    if(postId !== undefined){
                        nav('/postDetail/'+postId);
                    }else{
                        nav('/');
                    }
                }else{
                    console.log('Wrong username or password');
                }
            })
        })
        .catch(err => console.error(err));
    }

  return (
    <main className='login'>
            <h1 className='loginTitle'>Login</h1>
            <form className='loginForm'  onSubmit={handleLogin}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
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
                <button className='btn btn-primary my-3' style={{width: '14vw'}}>Login</button>
                <p>
                    Don't have an account? <Link to='/register'>Create one</Link>
                </p>
            </form>
        </main>
  )
}

export default Login