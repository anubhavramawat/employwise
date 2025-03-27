import './App.css'
import React, { createContext, useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from "react-router";
import { loginUser } from './components/Apis';
import Login from './components/Login';
import UsersList from './components/UsersList';
import EditUser from './components/EditUser';
import { AuthProvider, useAuth } from './context/AuthContext';

// Auth Context
// const AuthContext = createContext();
// export const useAuth = () => useContext(AuthContext);

// const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));

//   const login = async (email, password) => {
//     try {
//       const data = await loginUser(email, password);
//       localStorage.setItem("token", data.token);
//       setToken(data.token);
//     } catch (error) {
//       throw new Error("Invalid credentials");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

const PrivateRoute = ({ element }) => {
  const { token } = useAuth();
  return token ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<PrivateRoute element={<UsersList />} />} />
          <Route path="/edit/:id" element={<PrivateRoute element={<EditUser />} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App
