import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import LandingPage from "./components/LandingPage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import PasswordForm from "./components/PasswordForm.jsx";
import PasswordList from "./components/PasswordList.jsx";
import Header from "./components/Header.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuthenticated(true);
      } catch (error) {
        console.log("Token invalid or expired:", error.response?.status);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <LoginForm
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/passwords"
          element={
            isAuthenticated ? <PasswordList /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/add-password"
          element={
            isAuthenticated ? <PasswordForm /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </>
  );
}

export default App;
