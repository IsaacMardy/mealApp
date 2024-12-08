import {signOut} from './../Services/UserServices';

function Home() {

  const logOut = (event) => {
    event.preventDefault()
    signOut();
  }

  const loggedInUser = `${JSON.parse(localStorage.getItem('loggedInUser')).firstName} ${JSON.parse(localStorage.getItem('loggedInUser')).lastName}`;

  return (
    <div>
        Welcome {loggedInUser}
        <br></br>
        <button class="btn" onClick={logOut}>Log Out</button>
    </div>
  );
}

export default Home;