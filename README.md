This is a Social media app (FOCII) it uses a firebases for backend authentication and frontend as reactjs and typescript.
to install firebase, type in cmd npm install firebase
firbase/auth has many hooks like signInWithPopup it creates a pop up to login through google has many other options 
firebase provides plenty of options on the site to authenticate user i chose google as it brings out professional approach.

* Installed react-router-dom to navigate between different pages  (to install type NPM INSTALL REACT-ROUTER-DOM)
* Installed react-firebase-hooks to show the photo and name of the logged in user by typing NPM INSTALL REACT-FIREBASE-HOOKS (earlier used auth.currentUser? which did not show photo after refresh and did not show the photo for another user signed in

** For Logout    in Navbar component
*imported { signOut } from "firebase/auth"; and created a async await function for that 

** Navbar  Component
* navbar component contains sign in and logout

** Pages
contains 
*login page  has to button to login 
    - used useNavigate to redirect user to home page after signing/logging in 
 * Main page  nothing yet updated in this commit 
 
 ** configure folder
 * has firebas.ts files which provied auth function and Googleauthprovider funtions has important details of the project apikey , appid etc

** app.tsx
basic details like importing from react-router-dom (router,routes,route) use to create route to Main and Login page
