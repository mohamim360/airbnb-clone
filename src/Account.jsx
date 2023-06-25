import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

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

  function classes(type = null) {
    let value = "py-2 px-4";

    if (type === subpage) {
      value += " bg-primary rounded-full text-white";
    }
    return value;
  }

  return (
    <div>
      account {user.name}
      <nav className="w-full flex justify-center mt-12 gap-11 mb-10">
        <Link to="/account" className={classes("profile")}>
          My profile
        </Link>
        <Link to="/account/bookings" className={classes("bookings")}>
          My bookings
        </Link>
        <Link to="/account/places" className={classes("places")}>
          My accommodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-md mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-4">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Account;
