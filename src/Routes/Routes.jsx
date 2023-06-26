import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Login";
import Register from "../Register";
import { UserContextProvider } from "../UserContext";
import Account from "../Account";
import axios from "axios";
import Places from "../Pages/Places";
import PlacesForm from "../Pages/PlacesForm";

axios.defaults.baseURL='http://localhost:5000'
axios.defaults.withCredentials = true;

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserContextProvider>
        <Main></Main>
      </UserContextProvider>
    ),
    children: [
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/account/", element: <Account></Account> },
      { path: "/account/places", element: <Places></Places> } ,  
      { path: "/account/places/new", element: <PlacesForm></PlacesForm> }    
    ],
  },
]);
