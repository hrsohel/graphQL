import React from 'react';
import {Link} from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
          <ul>
              <li><Link to={`/`} >Home</Link></li>
              <li><Link to={`/add-user`} >Add User</Link></li>
              <li><Link to={`/login`} >Login</Link></li>
          </ul>  
        </header>
    );
};

export default Navbar;