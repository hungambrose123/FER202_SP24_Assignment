import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { removeCurrentAccount } from '../slice/accountSlice';



const Header = () => {
  const account = useSelector(state => state.account);
  const dispatch = useDispatch();


  const onSelect = ({ isActive }) => ({
    color: isActive && '#FFA07A',
    background: isActive && '#87CEFA',
    padding: isActive && '20px',
    borderRadius: isActive && '5%'
  });
  const handleSignOut = () => {
    dispatch(removeCurrentAccount());
  }

  return (
    <header className="p-3 mb-3 border-bottom myHeader">
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li className="px-2"><NavLink to='/' className='text-decoration-none text-dark' style={onSelect}>Home</NavLink></li>
          <li className='px-2'><NavLink to='/createQuestion' className='text-decoration-none text-dark' style={onSelect}>Create question</NavLink></li>
        </ul>

        {account.id === -1 && <ul className="nav col-12 col-lg-auto me-1 justify-content-center">
          <li className="px-2"><NavLink to='/login' className='text-decoration-none text-dark' style={onSelect}>Login</NavLink></li>
          <li className="px-2"><NavLink to='/register' className='text-decoration-none text-dark' style={onSelect}>Register</NavLink></li>
        </ul>}

        {account.id !== -1 && <div className="dropdown text-end">
          <span>Hello, {account.username}</span>
          <a class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={account.avatar} alt="mdo" width="32" height="32" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li className="px-2"><Link to='/setting' className="dropdown-item">Settings</Link></li>
            <li className="px-2"><Link to='/userProfile' className="dropdown-item">Profile</Link></li>
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