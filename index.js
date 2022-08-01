#!/usr/bin/env node
import inquirer from "inquirer";
import basicBot from "./basicBot.js";
import shardingBot from "./shardingBot.js";

export let botName;
export let botToken;
export let createModules;

const askBotName = async () => {
  const answers = await inquirer.prompt({
    name: "bot_name",
    type: "input",
    message: "How do you want to name your bot?",
    default() {
      return "Bot";
    },
  });

  botName = answers.bot_name;
};

const askBotToken = async () => {
  const answers = await inquirer.prompt({
    name: "bot_token",
    type: "password",
    message: "How do you want to name your bot?",
    default() {
      return "your-token-from-discord-api";
    },
  });

  botToken = answers.bot_token;
};

const askCreateModules = async () => {
  const answers = await inquirer.prompt({
    name: "create_modules",
    type: "list",
    message: "Do you want to us to generate node_modules automatically?",
    choices: [
      {
        name: "Yes",
        value: true,
      },
      {
        name: "No",
        value: false,
      },
    ],
  });

  createModules = answers.create_modules;
};

const botTypeQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "botType",
    type: "list",
    message: "What type of bot do you want to create?",
    choices: [
      {
        name: "Create a basic bot (recommended)",
        value: "basic_bot",
      },
      {
        name: "Create a sharding bot",
        value: "sharding_bot",
      },
    ],
  });

  return handleBotType(answers.botType);
};

const handleBotType = async (botPrefer) => {
  if (botPrefer === "basic_bot") return basicBot();
  if (botPrefer === "sharding_bot") return shardingBot();
  throw new Error("Invalid bot type");
};

await askBotName();
await askBotToken();
await askCreateModules();
await botTypeQuestion();
