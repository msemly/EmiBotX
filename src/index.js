const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = { token: process.env.DISCORD_TOKEN };
const logger = require("./utils/logger.js");

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

// Initialize database
db.init();

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
