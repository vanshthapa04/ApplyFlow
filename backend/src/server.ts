import dotenv from "dotenv";
dotenv.config();

console.log("1️⃣ server.ts loaded");

import app from "./app";
console.log("2️⃣ app imported");

import { connectDB } from "./database/db";
console.log("3️⃣ db imported");

const PORT = Number(process.env.PORT) || 8000;

async function startServer() {
  console.log("4️⃣ startServer called");

  try {
    console.log("5️⃣ connecting to database...");
    await connectDB();

    console.log("6️⃣ database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("SERVER ERROR");
    console.error(err);
  }
}

startServer();