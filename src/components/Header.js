import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  const signOut = () => {
    console.log('sign out successfuly !');
  }

  return (
    <header class="p-3 mb-3 border-bottom">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
          
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li className="px-2"><NavLink to='/' className='text-decoration-none text-dark'>Home</NavLink></li>
          <li className='px-2'><NavLink to='/createQuestion' className='text-decoration-none text-dark'>Create question</NavLink></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control" placeholder="Search..." aria-label="Search" />
        </form>

        <ul class="nav col-12 col-lg-auto me-1 justify-content-center">
          <li className="px-2"><NavLink to='/login' className='text-decoration-none text-dark'>Login</NavLink></li>
          <li className="px-2"><NavLink to='/register' className='text-decoration-none text-dark'>Register</NavLink></li>
        </ul>

        <div class="dropdown text-end">
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle" />
          </a>
          <ul class="dropdown-menu text-small" aria-labelledby="dropdownUser1">
            <li className="px-2"><Link to='/setting' class="dropdown-item" href="#">Settings</Link></li>
            <li className="px-2"><Link to='/profile' class="dropdown-item" href="#">Profile</Link></li>
            <li><hr class="dropdown-divider" /></li>
            <li><button class="dropdown-item" onClick={signOut}>Sign out</button></li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  )
}

export default Header