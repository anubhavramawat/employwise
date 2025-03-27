import React, {useState} from 'react'
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/users");
    } catch (err) {
      setError(err.message);
    }
  };
    return (
        <div className="min-h-screen flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
            <h2 className="text-lg font-bold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <input className="border p-2 w-full mb-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input className="border p-2 w-full mb-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button className="bg-blue-500 text-white p-2 w-full" type="submit">Login</button>
          </form>
        </div>
      );
}

export default Login
