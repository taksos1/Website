const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');

const app = express();

const BOT_TOKEN = "MTI3OTI3MjU0MDA3Mzg4OTg1Ng.GroVjX.Ljrq-vGqRKWjzAtdpFd3GRIwLcz_Wec30y1paA";  // Replace with your bot token

// Create Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds] // We only need Guilds intent
});

let botGuildIds = [];

// When bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
  // Cache the guild IDs bot is in
  botGuildIds = client.guilds.cache.map(guild => guild.id);
  console.log("Bot is in guilds:", botGuildIds);
});

// Login the bot
client.login(BOT_TOKEN);

// API endpoint to get guild IDs bot is in
app.get('/bot/guilds', (req, res) => {
  res.json(botGuildIds);
});

// Start the API server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot guilds API running on port ${PORT}`);
});
