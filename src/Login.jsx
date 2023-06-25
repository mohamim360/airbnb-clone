import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState("");
 const {setUser} = useContext(UserContext);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/login", {
        email,
        password,
      });
      
      const { data, headers } = response;
      const token = headers && headers["set-cookie"] && headers["set-cookie"][0];

      document.cookie = token;

      alert("login success");
      setUser(data);
      setRedirect(true);
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mt-4 grow flex  justify-around">
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-5">Login</h1>
        <form className="mx-auto max-w-md" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="your@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2">
            Don't have account yet?
            <Link className="underline text-gray-600" to="/register">
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
