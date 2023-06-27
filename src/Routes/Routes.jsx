import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Login";
import Register from "../Register";
import { UserContextProvider } from "../UserContext";
import Account from "../Account";
import axios from "axios";
import Places from "../Pages/Places";
import PlacesForm from "../Pages/PlacesForm";
import IndexPage from "../Pages/IndexPage";
import PlaceDetails from "../Pages/PlaceDetails";
import BookingPage from "../Pages/BookingPage";
import BookingDetails from "../Pages/BookingDetails";

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
      { path: "/", element: <IndexPage></IndexPage> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      { path: "/account", element: <Account></Account> },
      { path: "/account/places", element: <Places></Places> } ,  
      { path: "/account/places/new", element: <PlacesForm></PlacesForm> }, 
      { path: "/account/places/:id", element: <PlacesForm></PlacesForm> },  
      { path: "/place/:id", element: <PlaceDetails></PlaceDetails> },
      { path: "/account/bookings", element: <BookingPage></BookingPage> } ,
      { path: "/account/bookings/:id", element: <BookingDetails></BookingDetails> } 
    ],
  },
]);
