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

export const getEnv = (botToken) => {
  return `TOKEN = ${botToken}`;
};

export const getHandler = () => {
  return `const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async (client) => {
  const eventFiles = await globPromise('\`'${process.cwd()}/events/**/*.js\`);

  eventFiles.map((value) => require(value));

  const slashCommands = await globPromise(
    \`${process.cwd()}/commands/**/*.js\`
  );

  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    client.commands.set(file.name, file);
  });
};`;
};

export const getReadyEvent = (botName) => {
  return `const client = require("../../index");

client.on("ready", async () => {
  console.log("xd ✅");
});`;
};

export const getInteractionEvent = () => {
  return `const client = require("../../index");
const { InteractionType } = require("discord.js");

client.on("interactionCreate", async (interaction) => {
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
}
