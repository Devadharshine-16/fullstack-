const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;
require('dotenv').config();
require('./db');


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const userSchema = new mongoose.Schema({
  username:{type:String, required:true},
  email:{type:String, required:true, unique:true},
  age:{type:Number, required:true}       
})
const User = mongoose.model('User', userSchema);


const newUser = new User({
  username: "Dev",
  email: "dev@example.com",
  age: 30
});

newUser.save().then(() => {
  console.log("User saved successfully");
}).catch((error) => {
  console.error("Error saving user:", error);
});

app.get('/users/:id/profile/:name/:age', (req, res) => {
  const id = req.params.id;
  const name = req.params.name;
  const age = req.params.age;

  res.send(`User ID: ${id}, Name: ${name}, Age: ${age}`);
});

app.put('/users', (req, res) => {
  res.send('PUT request to the users /users');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port http://localhost:7000`);}
)