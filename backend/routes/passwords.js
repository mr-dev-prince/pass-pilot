import express from "express";
import Password from "../db/models/Password.js";
import authMiddleware from "../middleware/authMiddleware.js";
import CryptoJS from "crypto-js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { label, application, password } = req.body;
  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.ENCRYPTION_KEY
    ).toString();
    const newPassword = new Password({
      userId: req.user.userId,
      label,
      application,
      password: encryptedPassword,
    });
    await newPassword.save();
    res.status(201).json({ message: "Password saved" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    console.log("hello jjee");
    const passwords = await Password.find({ userId: req.user.userId });
    const decryptedPasswords = passwords.map((p) => ({
      ...p._doc,
      password: CryptoJS.AES.decrypt(
        p.password,
        process.env.ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8),
    }));
    res.json(decryptedPasswords);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { label, application, password } = req.body;
  try {
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.ENCRYPTION_KEY
    ).toString();
    await Password.findByIdAndUpdate(req.params.id, {
      label,
      application,
      password: encryptedPassword,
    });
    res.json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
