import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import mesh from "../assets/mesh.mp4";

function LoginForm({ setIsAuthenticated, isAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/passwords");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/login`,
          { username, password }
        );
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
      } catch (err) {
        console.error(err);
        setError("Invalid credentials");
      }
    },
    [username, password, setIsAuthenticated]
  );

  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={mesh} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <motion.div
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-8 w-full max-w-md shadow-2xl text-white"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center">
            Welcome Back
          </h2>
          {error && (
            <motion.p
              className="text-red-400 mb-4 text-sm text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoComplete="current-password"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white font-semibold py-3 rounded-lg shadow-lg transition-all"
            >
              Login
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginForm;
