import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };
  // we can get more like loading ,error but now we want user
  return (
    <div className="flex justify-center items-center">
      <button className=" border-2 border-black  rounded-md">
        {" "}
        <Link to={"/"}>home</Link>
      </button>
      <button className=" ml-2 border-2 border-black  rounded-md">
        <Link to={"/login"} className="">
          Login
        </Link>
      </button>
      <div>
        {/* below is the condition tht if user is there then show img and name */}
        {user && (
          <>
            <p>{user?.displayName}</p>
            <img
              src={user?.photoURL || ""}
              alt="gphoto"
              width={"100"}
              height={"100"}
            />
            <button onClick={signUserOut}>Log Out</button>
          </>
        )}
      </div>
    </div>
  );
};
