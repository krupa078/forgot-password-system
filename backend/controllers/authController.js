import bcrypt from "bcrypt";
import User from "../models/User.js";

// 🔹 Helper: generate random password (only A–Z, a–z)
function generatePassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

/**
 * REGISTER
 * - name, email, phone, password
 * - password only letters A–Z, a–z
 */
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // only letters
    if (!/^[A-Za-z]+$/.test(password)) {
      return res
        .status(400)
        .json({ error: "Password must contain only letters (A–Z, a–z)" });
    }

    // already exists?
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ error: "Phone already registered" });
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      phone,
      password: hashed,
      resetDate: null,
    });

    res.json({ message: "Registered successfully!" });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * LOGIN
 * - login with email + password
 */
export const login = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
    });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    res.json({
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};



/**
 * FORGOT PASSWORD
 * Requirement B:
 * - User can use EMAIL or PHONE (either one OR both)
 * - But at least one should match a user
 * - Only ONE reset allowed per day per user
 * - New password auto-generated (only letters)
 */
export const forgotPassword = async (req, res) => {
  try {
    let { email, phone } = req.body;

    email = email?.trim();
    phone = phone?.trim();

    if (!email && !phone) {
      return res
        .status(400)
        .json({ error: "Please enter email or phone number" });
    }

    let user;

    // If both are given, try to match both (more strict)
    if (email && phone) {
      user = await User.findOne({
        email: email.toLowerCase(),
        phone,
      });
    } else if (email) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res
        .status(400)
        .json({ error: "No user found with given email / phone" });
    }

    const today = new Date().toISOString().split("T")[0];

    // only once per day
    if (user.resetDate === today) {
      return res.status(400).json({
        error: "You can reset your password only once per day!",
      });
    }

    const newPassword = generatePassword(8);
    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.resetDate = today;
    await user.save();

    return res.json({
      message: "Your new password has been generated.",
      newPassword,
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};
