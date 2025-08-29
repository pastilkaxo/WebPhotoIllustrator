require('dotenv').config({ path:"../.env"});
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DbClient = require("./Database/connection.js");


const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.API_KEY; 
console.log("JWT_SECRET:", JWT_SECRET);
// Регистрация
app.post("/api/register", async (req, res) => {
  const { email, login, password } = req.body;
  if (!email || !login || !password) {
    return res.status(400).json({ message: "Все поля обязательны!" });
  }

  try {
    const client = await DbClient.connect();
    const db = client.db("WebIllustrator");
    const users = db.collection("Users");

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email уже зарегистрирован" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, login, password: hashedPassword };
    await users.insertOne(newUser);

    res.status(201).json({ message: "Регистрация успешна" });
  } catch (err) {
    console.error("Ошибка регистрации:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

// Авторизация
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Введите email и пароль" });
  }

  try {
    const client = await DbClient.connect();
    const db = client.db("WebIllustrator");
    const users = db.collection("Users");

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Пароль из базы:", user.password);
    console.log("Введённый пароль:", password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }
    console.log("isMatch:", isMatch);

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Успешный вход", token });
  } catch (err) {
    console.error("Ошибка входа:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

app.listen(5000, () => console.log("Сервер запущен на http://localhost:5000"));
