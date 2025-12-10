import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [newfoodname, setNewfoodname] = useState("");
  const [days, setDays] = useState("");
  const [foodlist, setFoodlist] = useState([]);

  // READ
  useEffect(() => {
    axios
      .get("http://localhost:3001/read")
      .then((res) => {
        setFoodlist(res.data);
      })
      .catch((err) => console.error("Read error:", err));
  }, []);

  // CREATE
  const addtolist = () => {
    if (!newfoodname.trim() || !days.trim()) {
      alert("Please enter both food name and days");
      return;
    }
    axios
      .post("http://localhost:3001/insert", {
        foodName: newfoodname,
        daySinceIate: Number(days),
      })
      .then((res) => {
        console.log("Added food:", res.data);
        setFoodlist([...foodlist, res.data]);
        setNewfoodname("");
        setDays("");
        alert("Food added successfully!");
      })
      .catch((err) => {
        console.error("Insert error:", err);
        alert("Failed to add food: " + (err.response?.data?.error || err.message));
      });
  };

  // UPDATE
  const updatetolist = (id) => {
    axios
      .put(`http://localhost:3001/update/${id}`, {
        foodName: newfoodname,
        daySinceIate: Number(days),
      })
      .then((response) => {
        alert("Updated Successfully");
      })
      .catch((err) => console.error("Update error:", err));
  };

  // DELETE
  const deletetolist = (id) => {
    axios
      .delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setFoodlist(foodlist.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div className="App">
      <h1>Add Food</h1>

      <input
        type="text"
        placeholder="Food name"
        value={newfoodname}
        onChange={(e) => setNewfoodname(e.target.value)}
      />

      <input
        type="number"
        placeholder="Days since eaten"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <button onClick={addtolist}>Add</button>

      <h1>Food List</h1>

      {foodlist.length > 0 ? (
        foodlist.map((val) => (
          <div
            key={val._id}
            style={{
              border: "1px solid gray",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <h3>Food: {val.foodName}</h3>
            <p>Days: {val.daySinceIate}</p>

            <button onClick={() => deletetolist(val._id)}>Delete</button>

            <input
              type="text"
              placeholder="New name"
              onChange={(e) => setNewfoodname(e.target.value)}
            />

            <input
              type="number"
              placeholder="New days"
              onChange={(e) => setDays(e.target.value)}
            />

            <button onClick={() => updatetolist(val._id)}>Update</button>
          </div>
        ))
      ) : (
        <p>No food items</p>
      )}
    </div>
  );
}

export default App;
