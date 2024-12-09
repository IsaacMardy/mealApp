import { Link } from "react-router-dom";
import React, { useState } from "react";
import {register} from "../Services/UserServices";
// import axios from "axios";

//registering function
function Register() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userID, setUserID] = useState("");
    const [password, setPassword] = useState("");
    const [isDietician, setIsDietician] = useState(false);
    const [dieticianID, setDieticianID] = useState("");

      const handleSignUp = (event) => {
        event.preventDefault()
        const newUser = isDietician
      ? { firstName, lastName, userID, password, dieticianID }
      : { firstName, lastName, userID, password };
        register(newUser);
      }

    return (
      <div>
        <form class="form-group" onSubmit={handleSignUp}>
          <label for="firstName" class="form-group">First Name:</label>
          <input type="text" id="firstName" name="firstName" class="form-control" placeholder="First Name" onChange={(e)=>setFirstName(e.target.value)}></input>
          <label for="LastName">Last Name:</label>
          <input type="text" id="LastName" name="LastName" class="form-control" placeholder="Last Name" onChange={(e)=>setLastName(e.target.value)}></input>
          <label for="UserID">Username:</label>
          <input type="text" id="UserID" name="UserID" class="form-control" placeholder="Username" onChange={(e)=>setUserID(e.target.value)}></input>
          <label for="username">Password:</label>
          <input type="text" id="password" name="password" class="form-control" placeholder="Password" onChange={(e)=>setPassword  (e.target.value)}></input>

    {/* Dietician Checkbox */}
        <div>
          <label>
            <input
              type="checkbox"
              checked={isDietician}
              onChange={(e) => setIsDietician(e.target.checked)}
            />
            Register as a Dietician
          </label>
        </div>

        {/* Dietician ID Field */}
        {isDietician && (
          <div>
            <label htmlFor="dieticianID">Dietician ID:</label>
            <input
              type="text"
              id="dieticianID"
              name="dieticianID"
              className="form-control"
              placeholder="Dietician ID"
              onChange={(e) => setDieticianID(e.target.value)}
            ></input>
          </div>
        )}
         
         
          <button 
                type="button" 
                onClick={(event) => handleSignUp(event,firstName, lastName, userID, password)}>
                Signup
            </button>


          
        </form>

          <p> Already have an account? <Link to="/Login">Login</Link></p>
      </div>
    );
  }
  
  export default Register;
