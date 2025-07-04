const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

app.post("/", async (req, res) => {
  const alertMessage = req.body.text || "Alert received!";

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: alertMessage,
    });
    res.status(200).send("Alert sent to Telegram!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send alert.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
