import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [daysSinceIAte, setDaysSinceIAte] = useState("");
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLogin(true);
      fetchFoods(token);
    }
  }, []);

  const fetchFoods = async (token) => {
    try {
      const res = await axios.get("http://localhost:3000/api/food", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/register", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setIsLogin(true);
      fetchFoods(res.data.token);
      alert("Registered Successfully!");
    } catch (err) {
      console.log(err);
      alert("Register Failed!");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setIsLogin(true);
      fetchFoods(res.data.token);
    } catch (err) {
      console.log(err);
      alert("Invalid Credentials!");
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/food",
        { name, daysSinceIAte },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setDaysSinceIAte("");
      fetchFoods(token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
  };

  if (!isLogin) {
    return (
      <div>
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Username" value={username}
                 onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password}
                 onChange={(e) => setPassword(e.target.value)} />
          <button>Register</button>
        </form>

        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Username" value={username}
                 onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password}
                 onChange={(e) => setPassword(e.target.value)} />
          <button>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome!</h2>
      <button onClick={handleLogout}>Logout</button>

      <h3>Add Food</h3>
      <form onSubmit={handleAddFood}>
        <input type="text" placeholder="Food Name" value={name}
               onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder="Days Since Ate" value={daysSinceIAte}
               onChange={(e) => setDaysSinceIAte(e.target.value)} />
        <button>Add</button>
      </form>

      <h3>Food List</h3>
      <ul>
        {foods.map((f) => (
          <li key={f._id}>
            {f.name} - {f.daysSinceIAte} days ago
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
