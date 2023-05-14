import { auth, gprovider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// ABOVE LINE singInWithPopup is a method in which a popup appears to sign in with goo=gle there are plenty of options but this is bettter

export const Login = () => {
  const navigate = useNavigate();
  //   created so that we can navigte to a page after the authentication
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, gprovider);
    navigate("/");
    // placed here just aftwr authentication

    console.log(result);
  };

  return (
    <div>
      <p>Sign In With Google</p>
      <button className=" bg-red-600 rounded-lg" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};
