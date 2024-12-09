import { Link } from "react-router-dom";
import React, { useState } from "react";
import { checkLogin } from "../Services/UserServices";

//login function
function Login() {

  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [isDietician, setIsDietician] = useState(false);


  const handleLogin = (event) => {
    event.preventDefault()
    const loginData = { userID, password, dietician: isDietician };
    checkLogin(loginData);
  }

  // deleted this: <button class="btn" type="submit">Submit</button>
  return (
    <div>
        <form class="form-group" onSubmit={handleLogin}>
            <label for="UserID">Username:</label>
            <input type="text" id="UserID" name="UserID" placeholder="Username" class="form-control" value={userID} onChange={(e)=>setUserID(e.target.value)}></input>
            <label for="Password">Password:</label>
            <input type="text" id="password" name="password" placeholder="Password" class="form-control" value={password} onChange={(e)=>setPassword(e.target.value)}></input>

            {/* Dietician Login Toggle */}
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={isDietician}
                        onChange={(e) => setIsDietician(e.target.checked)}
                      />
                      Login as Dietician
                    </label>
                  </div>

            <button type = "button" 
            onClick={(event) => {  handleLogin(event, userID, password)}}>
                        Login
                </button>

        </form>
        <Link to="/Register">Sign Up</Link> 
    </div>
  );
}

export default Login;
