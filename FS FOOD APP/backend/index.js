const express = require('express');
const mongoose = require('mongoose');
const food = require('./models/food');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");


app.use(cors());
app.use(express.json());

console.log("Connecting to MongoDB...");
mongoose.connect("mongodb+srv://root:root@cluster0.k1wedwy.mongodb.net/foodDB")

    .then(() => {
        console.log("✅ MongoDB connected successfully");
    })
    .catch(err => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });

// CREATE - Insert new food
app.post("/insert", async (req, res) => {
    try {
        const { foodName, daySinceIate } = req.body;
        if (!foodName || daySinceIate === undefined) {
            return res.status(400).json({ error: "foodName and daySinceIate are required" });
        }
        const newFood = new food({ foodName, daySinceIate });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (err) {
        console.error("Insert error:", err);
        res.status(500).json({ error: err.message });
    }
});

// READ - Get all food items
app.get("/read", async (req, res) => {
    try {
        const allFood = await food.find();
        res.json(allFood);
    } catch (err) {
        console.error("Read error:", err);
        res.status(500).json({ error: err.message });
    }
});

// UPDATE - Update a food item
app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { foodName, daySinceIate } = req.body;
        const updatedFood = await food.findByIdAndUpdate(
            id,
            { foodName, daySinceIate },
            { new: true }
        );
        if (!updatedFood) {
            return res.status(404).json({ error: "Food not found" });
        }
        res.json(updatedFood);
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: err.message });
    }
});

// DELETE - Delete a food item
app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFood = await food.findByIdAndDelete(id);
        if (!deletedFood) {
            return res.status(404).json({ error: "Food not found" });
        }
        res.json({ message: "Food deleted successfully", deletedFood });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

