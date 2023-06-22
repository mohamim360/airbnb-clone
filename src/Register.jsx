import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handelRegister(e) {
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      alert('registration success')
    }
    catch{
      alert('registration failed')
    }
   
  }

  return (
    <div className="mt-4 grow flex  justify-around">
      <div className="mt-32">
        <h1 className="text-4xl text-center mb-5">Register</h1>
        <form className="mx-auto max-w-md" onSubmit={handelRegister}>
          <input
            type="text"
            placeholder="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button className="primary">Register</button>
          <div className="text-center py-2">
            Already have a account?
            <Link className="underline text-gray-600" to="/login">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
