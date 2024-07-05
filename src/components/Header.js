import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { removeCurrentAccount } from '../slice/accountSlice';



const Header = () => {
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(removeCurrentAccount());
  }

  return (
    <header className="p-3 mb-3 border-bottom">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li className="px-2"><NavLink to='/' className='text-decoration-none text-dark'>Home</NavLink></li>
          <li className='px-2'><NavLink to='/createQuestion' className='text-decoration-none text-dark'>Create question</NavLink></li>
        </ul>

        {account.id === -1 && <ul className="nav col-12 col-lg-auto me-1 justify-content-center">
          <li className="px-2"><NavLink to='/login' className='text-decoration-none text-dark'>Login</NavLink></li>
          <li className="px-2"><NavLink to='/register' className='text-decoration-none text-dark'>Register</NavLink></li>
        </ul>}

        {account.id !== -1 && <div className="dropdown text-end">
          <span>Hello, {account.username}</span>
          <a class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://play-lh.googleusercontent.com/z-ppwF62-FuXHMO7q20rrBMZeOnHfx1t9UPkUqtyouuGW7WbeUZECmyeNHAus2Jcxw=w526-h296-rw" alt="mdo" width="32" height="32" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li className="px-2"><Link to='/setting' className="dropdown-item">Settings</Link></li>
            <li className="px-2"><Link to='/profile' className="dropdown-item">Profile</Link></li>
            <li><hr class="dropdown-divider" /></li>
            <li><button className="dropdown-item" onClick={handleSignOut}>Sign out</button></li>
          </ul>
        </div>}
      </div>
    </div>
  </header>
  )
}

export default Header