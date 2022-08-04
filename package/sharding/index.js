/* Generated with app-discord-create CLI */
required("dotenv").config();
const { ShardingManager } = require("discord.js");

const shards = new ShardingManager("./bot.js", {
	totalShards: "auto",
	mode: "process",
	token: process.env.TOKEN,
	respawn: true
});

shards.on("shardCreate", async shard => {
	console.log(`Shard #${shard.id} Launched`);
});

shards.spawn().catch(err => console.error(err));
