const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/", async (req, res) => {
  const alertMessage = req.body.text || "⚠️ Alert prišiel bez textu";
  console.log("📩 Prijatý alert:", req.body);

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: alertMessage,
    });

    res.status(200).send("✅ Alert odoslaný na Telegram");
  } catch (error) {
    console.error("❌ Chyba pri odoslaní:", error);
    res.status(500).send("❌ Nepodarilo sa odoslať alert");
  }
});

app.get("/", (req, res) => {
  res.send("Webhook beží");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server beží na porte ${PORT}`);
});
