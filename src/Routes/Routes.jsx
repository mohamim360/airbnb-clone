import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../Login";
import Register from "../Register";
import { UserContextProvider } from "../UserContext";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserContextProvider>
      <Main></Main>
      </UserContextProvider>,
    children: [
      { path: "/login",
       element: <Login></Login> },
      { path: "/register",
       element: <Register></Register> }
    ],
  },
]);
