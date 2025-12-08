const express = require('express');
const mongoose = require('mongoose');
const food = require('./models/food');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://root:root@cluster0.k1wedwy.mongodb.net/")


