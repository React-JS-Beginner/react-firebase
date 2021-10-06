import "./App.css";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import initializeAuthentication from "./Firebase/firebase.initialize";
import { useState } from "react";
import { Button } from "react-bootstrap";

initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

function App() {
  const [user, setUser] = useState({});
  const auth = getAuth();

  const googleHandler = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const { displayName, email, photoURL } = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        image: photoURL,
      };
      setUser(loggedInUser);
      // The signed-in user's info.
      const user = result.user;
      console.log(user);
    });
  };

  const githubHandler = () => {
    const auth = getAuth();
    signInWithPopup(auth, githubProvider).then((result) => {
      const { displayName, email, photoURL } = result.user;
      const loggedInUser = {
        name: displayName,
        email: email,
        image: photoURL,
      };
      setUser(loggedInUser);
      // The signed-in user's info.
      const user = result.user;
      console.log(user);
    });
  };

  const signOutHandler = () => {
    signOut(auth).then(() => {
      setUser({});
    });
  };

  return (
    <div className="App">
      {!user.name ? (
        <div className="m-5 p-5">
          <Button variant="outline-primary" onClick={googleHandler}>
            Sign In With Google
          </Button>{" "}
          &nbsp; &nbsp; &nbsp;
          <Button variant="outline-success" onClick={githubHandler}>
            Sign In With Github
          </Button>
        </div>
      ) : (
        <Button  className="m-5" variant="outline-danger" onClick={signOutHandler}>Sign Out</Button>
      )}

      <br />

      {user.name && (
        <div>
          <h2>Welcome {user.name}</h2>
          <h3>Your Email : {user.email}</h3>
          <img src={user.image} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
