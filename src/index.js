// ============================
// EmiBotX main index.js
// ============================

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = { token: process.env.DISCORD_TOKEN };
const logger = require("./utils/logger.js");

// Database
const db = require("./database/database.js");

// Create Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
    ],
});

// Initialize collections
client.commands = new Collection();
client.cooldowns = new Collection();

// Load handlers
require("./handlers/commandHandler.js")(client);
require("./handlers/eventHandler.js")(client);

// Login function
const token = process.env.DISCORD_TOKEN || config.token;
if (!token) {
    logger.error(
        "No Discord token provided! Please set DISCORD_TOKEN environment variable"
    );
    process.exit(1);
}

client.login(token).catch((error) => {
    logger.error("Failed to login:", error);
    process.exit(1);
});

// Global error handlers
process.on("unhandledRejection", (error) => {
    logger.error("Unhandled promise rejection:", error);
});
process.on("uncaughtException", (error) => {
    logger.error("Uncaught exception:", error);
    process.exit(1);
});

// Example command for testing database
client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    if (message.content === "!test") {
        db.set("hello", "Hello, EmiBotX is working!");
        const value = db.get("hello");
        message.channel.send(`Database test value: ${value}`);
    }
});

// ============================
// Express Ping Server
// ============================
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("EmiBotX is alive!");
});

app.listen(port, () => {
    console.log(`Ping server running on port ${port}`);
});
