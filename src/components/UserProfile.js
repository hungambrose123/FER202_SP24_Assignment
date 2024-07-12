import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentAccount } from '../slice/accountSlice';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const account = useSelector(state => state.account);
    const [username, setUsername] = useState(account.username);
    const [password, setPassword] = useState(account.password);
    const [avatar, setAvatar] = useState(account.avatar);
    const dispatch = useDispatch();

    useEffect(()=> {
        console.log(account);
    }, [])


    const handleChangeUserProfile = (e) => {
        e.preventDefault();
        const updatedUser = {
            username: username,
            password: password,
            avatar: avatar
        };
        axios.patch('http://localhost:9000/user/'+account.id, updatedUser)
        .then(res => {
            alert('Save user profile successfull');
            dispatch(setCurrentAccount(res.data));
        })
        .catch(err => console.error(err))
    }

    if(account.id === -1){
        return <div className='container' style={{height:'70vh'}}>
            <h3>Please login to view your user profile <span><Link to={'/login'} className='btn btn-primary'>Login <i class="fa-solid fa-right-to-bracket"></i></Link></span></h3>
        </div>
    }

  return (
    <div className='container'>
        <h1 className='text-center'>User Profile</h1>
        <form className='form' onSubmit={handleChangeUserProfile}>
            <div className="form-group mt-3">
                <label htmlFor="username">Username</label>
                <input type="text" className='form-control' id='username' name='username' value={username} onChange={e =>setUsername(e.target.value)} required/>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="password">Password</label>
                <input type="text" className='form-control' id='password' name='password' value={password} onChange={e =>setPassword(e.target.value)} required/>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="avatar">Avatar</label>
                <div><img src={account.avatar} alt="user avatar" className='img-fluid rounded-circle' style={{width: '13vw'}}/></div>
                <input type="text" className='form-control' id='avatar' name='avatar' value={avatar} onChange={e =>setAvatar(e.target.value)} required/>
            </div>

            <div className="form-group mt-3">
                <button className='btn btn-success' type='submit'>Save changes</button>
            </div>
        </form>
    </div>
  )
}

export default UserProfile