import { Link } from "react-router-dom";
import React, { useState } from "react";
import {register} from "../Services/UserServices";
import "./Register.css";
// import axios from "axios";

//registering function
function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");

    //need signup message
      const handleSignUp = (event) => {
        event.preventDefault()
        const newUser = {
          firstName:firstName,
          lastName:lastName,
          userID:userID,
          password:password
        }
        register(newUser);
        window.location.reload();
      };

      //add diatitian check box
      return (
        <div className="register-container">
          <form className="form-group" onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userID">Username:</label>
              <input
                type="text"
                id="userID"
                className="form-control"
                placeholder="Username"
                onChange={(e) => setUserID(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Signup
            </button>
          </form>
    
          <p className="login-redirect">
            Already have an account?{" "}
            <Link to="/Login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      );
    }
    
    export default Register;