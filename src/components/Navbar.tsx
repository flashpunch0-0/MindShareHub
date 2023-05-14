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
    // content wrapper
    <nav className=" bg-yellow-400 shadow-xl  ">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center  ">
          {/* contains two sides siteloga and authentication buttons */}
          <div className=" w-2/3 flex items-center  ">
            {/* logo container */}
            <span className="font-semibold text-indigo-950  text-2xl py-2 hover:scale-125">
              Focii
            </span>
          </div>

          <div className=" w-1/3 flex justify-end items-center   ">
            {/* authenticator buttoncontainer */}
            <button className=" mr-1 ">
              <Link
                className="py-1   px-1 font-medium text-indigo-950 rounded hover:bg-green-500 hover:text-white transition duration-300"
                to={"/"}
              >
                home
              </Link>
            </button>

            {/* if user is there then show create post button or else show login button for user to login */}
            {!user ? (
              <button className=" mr-1 ">
                <Link
                  to={"/login"}
                  className="py-1  px-1 font-medium text-indigo-950 rounded hover:bg-green-500 hover:text-white transition duration-300"
                >
                  Login
                </Link>
              </button>
            ) : (
              <button className=" mr-1 ">
                <Link
                  to={"/CreatePost"}
                  className="py-1  px-1 font-medium text-indigo-950 rounded hover:bg-green-500 hover:text-white transition duration-300"
                >
                  create
                </Link>
              </button>
            )}

            {user && (
              <>
                {/* <p>{user?.displayName}</p> */}
                <img
                  src={user?.photoURL || ""}
                  alt="gphoto"
                  className="w-8  h-8 mr-1"
                />
                <button
                  onClick={signUserOut}
                  className="   py-1  px-1 font-medium text-indigo-950 rounded md:hover:bg-green-500 hover:text-red-500 md:hover:text-white transition duration-300"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
