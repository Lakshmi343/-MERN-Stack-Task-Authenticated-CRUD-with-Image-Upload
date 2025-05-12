// // src/pages/Register.jsx
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/auth/register", { email, password });
//       alert("Registered successfully!");
//       navigate("/");
//     } catch (err) {
//       alert("Registration failed");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold">Register</h1>
//       <input className="border p-2 my-2 w-full" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
//       <input className="border p-2 my-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
//       <button className="bg-blue-500 text-white px-4 py-2" onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

// export default Register;
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", { email, password });
      alert("Registered successfully!");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input className="border p-2 my-2 w-full" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 my-2 w-full" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
