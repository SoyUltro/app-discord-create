export const getPackage = (botName) => {
  return `{
  "name": "${botName.toLowerCase()}",
  "version": "0.0.1",
  "description": "Bot created with app-discord-create CLI",
  "main": "index.js",
  "author": "app-discord-create",
  "dependencies": {
    "dotenv": "16.0.1",
    "discord.js": "14.1.2",
    "glob": "7.2.0",
    "util": "0.12.4"
  }
}
`;
};

export const getIndex = () => {
  return `/* Generated with app-discord-create CLI */
require("dotenv").config();
const { Collection, Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

module.exports = client;

client.commands = new Collection();

require("./handler.js")(client);

client.login(process.env.TOKEN);`;
};

export const getShardingIndex = () => {
  let stringOne = `required("dotenv").config();
const { ShardingManager } = require("discord.js");

const shards = new ShardingManager("./bot.js", {
  totalShards: "auto",
  mode: "process",
  token: process.env.TOKEN,
  respawn: true,
});

shards.on("shardCreate", async (shard) => {
`;
  let stringTwo = "  console.log(`Shard #${shard.id} Launched`);";
  let stringThree = `\n});

shards.spawn().catch((err) => console.error(err));`;

  return stringOne + stringTwo + stringThree;
};

export const getEnv = (botToken) => {
  return `TOKEN = ${botToken}`;
};

export const getHandler = () => {
  let stringOne = `const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async (client) => {`;

  let stringTwo =
    "\n  const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);";

  let stringThree = `
  eventFiles.map((value) => require(value));

  const slashCommands = await globPromise(`;

  let stringFour = "`${process.cwd()}/commands/**/*.js`);";
  let stringFive = `
  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.commands.set(file.name, file);
  });
};`;
  return stringOne + stringTwo + stringThree + stringFour + stringFive;
};

export const getReadyEvent = (botName) => {
  let stringOne = `const client = require("../../index");

client.on("ready", () => {\n`;
  let stringTwo = "  console.log(`${client.user.username} ✅`);";
  let stringThree = `\n});`;
  return stringOne + stringTwo + stringThree;
};

export const getInteractionEvent = () => {
  return `const { InteractionType } = require("discord.js");
const client = require("../../index");

client.on("interactionCreate", (interaction) => {
  if (interaction.type == InteractionType.ApplicationCommand) {
    const command = client.commands.get(interaction.commandName);
    if (!command)
      return interaction.reply({
        content: "Ha ocurrido un error inesperado",
        ephemeral: true,
      });

    const args = [];
    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    command.run(client, interaction, args);
  }
});`;
};
