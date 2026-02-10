import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (for simplicity)
const users = {}; // humanId => user data

// Check if humanId exists
app.get("/api/user/:humanId", (req, res) => {
  const { humanId } = req.params;
  if (users[humanId]) {
    return res.json({ exists: true, user: users[humanId] });
  }
  res.json({ exists: false });
});

// Register new user
app.post("/api/user/register", (req, res) => {
  const { humanId, firstName, lastName, age, gender, lookingFor, location } = req.body;

  if (!humanId) return res.status(400).json({ error: "humanId required" });
  if (users[humanId]) return res.status(400).json({ error: "User already exists" });

  const userId = uuidv4(); // generate unique user ID
  const credits = 100; // initial reward

  users[humanId] = {
    userId,
    firstName,
    lastName,
    age,
    gender,
    lookingFor,
    location,
    credits,
  };

  res.json({ success: true, user: users[humanId] });
});

// Get all users
app.get("/api/users", (req, res) => {
  const allUsers = Object.values(users);  // Extract users from in-memory database
  res.json({ users: allUsers });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
