import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import {  Navigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Pages/Places";
import AccountNav from "./Pages/AccountNav";

const Account = () => {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  if (ready && !user && !redirect) {
    return <Navigate to="/login" />;
  }
  if (!ready) {
    return "loading.....";
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  
  return (
    <div>
      <AccountNav></AccountNav>
     
      {subpage === "profile" && (
        <div className="text-center max-w-md mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-4">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <Places></Places>}
    </div>
  );
};

export default Account;
