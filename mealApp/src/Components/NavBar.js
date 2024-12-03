import { Link } from "react-router-dom";
import React, { useState } from "react";
import { signOut } from './../Services/UserServices';

//login function
function NavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('loggedInUser'));

  const logOut = (event) => {
    event.preventDefault()
    signOut();
    setIsLoggedIn(!!localStorage.getItem('loggedInUser'))
  }

  return (
    <nav className="navbar">
      {!isLoggedIn ? (
        <h1><Link to="/Login" style={{ textDecoration: 'none', color: 'White' }}>Weekly Beast</Link></h1>
      ) : (
        <h1><Link to="/Home" style={{ textDecoration: 'none', color: 'White' }}>Weekly Beast</Link></h1>
      )}
      <ul className="nav-links">
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/Login">Login</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/InputMeal">Add Meal</Link>
            </li>
            <li>
              <Link to="/DisplayMeals">See Selection</Link>
            </li>
            <li>
              <Link to="/DisplayScedule">See Schedule</Link>
            </li>
            <li>
              <Link onClick={logOut}>Log Out</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
