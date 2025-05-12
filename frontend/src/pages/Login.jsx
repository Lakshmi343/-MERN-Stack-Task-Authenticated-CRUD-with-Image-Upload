// // src/pages/Login.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const { login } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//       login(res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       alert("Login failed");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Login</h1>
//       <input className="border p-2 my-2 w-full" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input className="border p-2 my-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button className="bg-green-500 text-white px-4 py-2" onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="border p-2 my-2 w-full" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 my-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-green-500 text-white px-4 py-2" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
