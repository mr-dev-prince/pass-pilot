import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import water from "../assets/water.mp4";

function PasswordList() {
  const [passwords, setPasswords] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [editPassword, setEditPassword] = useState(null);
  const [copiedPasswords, setCopiedPasswords] = useState({});
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPasswords = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/passwords`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPasswords(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPasswords();
  }, []);

  const togglePasswordVisibility = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEdit = (password) => {
    setEditPassword(password);
  };

  const handleCopy = (id, passwordValue) => {
    navigator.clipboard.writeText(passwordValue);
    setCopiedPasswords((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedPasswords((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/passwords/${editPassword._id}`,
        editPassword,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setPasswords((prev) =>
        prev.map((p) => (p._id === editPassword._id ? editPassword : p))
      );
      setEditPassword(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPasswords = passwords.filter(
    (p) =>
      p.label.toLowerCase().includes(searchText.toLowerCase()) ||
      p.application.toLowerCase().includes(searchText.toLowerCase())
  );

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
      <div className="absolute inset-0 z-10 flex flex-col items-center px-2 sm:px-4 py-6 overflow-y-auto pt-[10vh]">
        <motion.div
          className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl shadow-2xl p-4 sm:p-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
            Credentials
          </h2>

          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-6">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full sm:w-[50%] border-2 border-gray-400 rounded-xl indent-2 outline-none text-white p-2"
            />
            <button
              onClick={() => navigate("/add-password")}
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-300 text-white px-4 py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              Add New
            </button>
          </div>

          {filteredPasswords.length === 0 ? (
            <p className="text-center text-gray-300">No passwords found.</p>
          ) : (
            <ul className="space-y-4 sm:space-y-6">
              {filteredPasswords.map((password) => (
                <li
                  key={password._id}
                  className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg p-4 shadow-md break-words"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-lg">{password.label}</p>
                      <p className="text-sm text-gray-300">
                        {password.application}
                      </p>
                      <p className="mt-1 text-white break-all">
                        {visiblePasswords[password._id]
                          ? password.password
                          : "••••••••"}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 justify-end">
                      <button
                        onClick={() => togglePasswordVisibility(password._id)}
                        className="bg-gray-200/30 hover:bg-white/20 px-3 py-1 rounded-lg text-sm"
                      >
                        {visiblePasswords[password._id] ? "Hide" : "Show"}
                      </button>
                      <button
                        onClick={() => handleEdit(password)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          handleCopy(password._id, password.password)
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 text-sm"
                      >
                        {copiedPasswords[password._id] ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        <AnimatePresence>
          {editPassword && (
            <motion.div
              className="fixed inset-0 bg-gray-600/30 backdrop-blur-sm z-50 flex items-center justify-center px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl p-4 sm:p-6 w-full max-w-md shadow-2xl"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-4">Edit Password</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editPassword.label}
                    onChange={(e) =>
                      setEditPassword({
                        ...editPassword,
                        label: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
                  />
                  <input
                    type="text"
                    value={editPassword.application}
                    onChange={(e) =>
                      setEditPassword({
                        ...editPassword,
                        application: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
                  />
                  <input
                    type="text"
                    value={editPassword.password}
                    onChange={(e) =>
                      setEditPassword({
                        ...editPassword,
                        password: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 outline-none"
                  />
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={handleUpdate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditPassword(null)}
                      className="w-full bg-gray-300 hover:bg-gray-400 text-black p-3 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PasswordList;
