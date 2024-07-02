import axios from 'axios';
import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers} from '../slice/dataFetchingSlice';
import userApi from '../api/userApi';

const Register = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const accountList = useSelector(state => state.data.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUsername = usernameRef.current.value;
    const newPassword = passwordRef.current.value;
    axios.post(userApi, {id: accountList.length+1 ,username: newUsername, password: newPassword})
    .then(res => {
      console.log('register successfully !',res.data);
      dispatch(getUsers());
    })
    .catch(err => console.error(err));
  }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-12">
                <h1 className='texxt-center'>Register</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-12">
                <form onSubmit={handleRegister}>
                    <div className="row">
                        <div className="input-group col-12">
                            <label htmlFor="username" className='form-label'>Username</label>
                            <input type="text" name='username' id='username' className='form-control' ref={usernameRef} required/>
                        </div>
                        <div className="input-group col-12">
                            <label htmlFor="password" className='form-label'>Password</label>
                            <input type="password" name='password' id='password' className='form-control' ref={passwordRef} required/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-8">
                            <p>Already have an account ? </p>
                            <Link to='/login'>Login</Link>
                        </div>
                        <div className="col-4">
                            <button className='btn btn-primary'>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="row">

        </div>
    </div>
  )
}

export default Register