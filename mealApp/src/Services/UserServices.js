import axios from "axios";

export function checkLogin(userID, password){
  axios.get('http://localhost:5001/loginCheck', { params: {userID, password} })
        .then((res) => {
          if(res.data){
            localStorage.clear()
            localStorage.setItem('loggedInUser', JSON.stringify(res.data.user))
            console.log(res.data._id)
            window.location.replace("/Home")
          } else {
            alert('Wrong Credentials')
          }
        })
        .catch((err) => alert('Error in Login'))
}

//need to put signup alert(successfull)
export function register(newUser){
  axios.post('http://localhost:5001/signup', newUser)
        .then()
        .catch((err) => alert('Error in Signing Up'))
}

export function signOut(){
  localStorage.clear();
  window.location.replace("/Login")
}