require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');

const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length) {
    console.error(`❌ Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.log("❌ MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model("User", UserSchema);

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysSinceIAte: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


const Food = mongoose.model("Food", FoodSchema);

const app = express();
app.use(cors());
app.use(express.json());

// JWT Middleware
function auth(req, res, next) {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "No token" });

    const token = header.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = data;
        next();
    });
}

// REGISTER
app.post("/api/register", async (req, res) => {
    const { username, password } = req.body;

    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ message: "User exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

// LOGIN
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
});

// ADD FOOD
app.post("/api/food", auth, async (req, res) => {
    const { name, daysSinceIAte } = req.body;
if (!name || !daysSinceIAte) {
    return res.status(400).json({ message: "Name and daysSinceIAte required" });
}

    const food = await Food.create({
        name,
        daysSinceIAte,
        user: req.user.id,
    });

    res.json(food);
});

// GET FOODS
app.get("/api/food", auth, async (req, res) => {
    const foods = await Food.find({ user: req.user.id });
    res.json(foods);
});

app.listen(3000, () => console.log("🚀 Server running on port 3000"));
