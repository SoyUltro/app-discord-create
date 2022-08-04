/* Generated with app-discord-create CLI */
require("dotenv").config();
const { Collection, Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
	intents: [GatewayIntentBits.Guilds]
});

module.exports = client;

client.commands = new Collection();

require("./handler.js")(client);

client.login(process.env.TOKEN);
