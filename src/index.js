const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = { token: process.env.DISCORD_TOKEN };
const logger = require("./utils/logger.js");

// Add this line at the top, before using db
const db = require("./database/database.js");

// Create a new client instance
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

// Login to Discord with your client's token
const token = process.env.DISCORD_TOKEN || config.token;
if (!token) {
    logger.error(
        "No Discord token provided! Please set DISCORD_TOKEN environment variable or add token to config.json",
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
client.on("messageCreate", (message) => {
    // Ignore bot messages
    if (message.author.bot) return;

    // !test command
    if (message.content === "!test") {
        // Set a test value
        db.set("hello", "Hello, EmiBotX is working!");

        // Get the value
        const value = db.get("hello");

        // Reply in Discord
        message.channel.send(`Database test value: ${value}`);
    }
});
