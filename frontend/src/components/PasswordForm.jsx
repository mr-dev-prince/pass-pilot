import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import water from "../assets/water.mp4";
import { Eye, LucideEyeClosed } from "lucide-react";

function PasswordForm() {
  const [label, setLabel] = useState("");
  const [application, setApplication] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCred, setShowCred] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/passwords`,
        { label, application, password },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      navigate("/passwords");
    } catch (err) {
      console.log(err);
      setError("Failed to save password");
    }
  };

  const handleShowCred = (e) => {
    e.preventDefault();
    setShowCred((prev) => !prev);
  };

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={water} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl shadow-2xl p-8"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Add Credential
          </h2>
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Application"
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="relative w-full">
              <input
                type={`${showCred ? "text" : "password"}`}
                placeholder="Credential"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg bg-white/20 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={handleShowCred}
                className="absolute right-2 top-[25%]"
              >
                {showCred ? (
                  <Eye color="red" />
                ) : (
                  <LucideEyeClosed color="green" />
                )}
              </button>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 text-white font-semibold py-3 rounded-lg shadow-md transition-all"
            >
              Save Credential
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default PasswordForm;
