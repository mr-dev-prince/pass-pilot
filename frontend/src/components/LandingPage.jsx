import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import water from "../assets/water.mp4";

function LandingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/passwords"); 
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
      <div className="absolute inset-0 bg-black/60  z-10 flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-pink-500 to-yellow-400 drop-shadow-xl mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Your Interstellar Password Vault
        </motion.h1>

        <motion.p
          className="text-white text-lg md:text-2xl max-w-2xl mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          Launch into a universe where your credentials are protected by
          cosmic-grade encryption.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button
            onClick={handleClick}
            className="bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-300 text-white px-8 py-4 rounded-xl shadow-xl text-lg font-semibold hover:scale-105 transform transition duration-300"
          >
            Launch Vault
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default LandingPage;
