#!/usr/bin/env node
import inquirer from "inquirer";
import basicBot from "./basicBot.js";
import customBot from "./customBot.js";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export let botName;
export let botToken;

async function askBotName() {
  const answers = await inquirer.prompt({
    name: "bot_name",
    type: "input",
    message: "How do you want to name your bot?",
    default() {
      return "Bot";
    },
  });

  botName = answers.bot_name;
}

async function askBotToken() {
  const answers = await inquirer.prompt({
    name: "bot_token",
    type: "password",
    message: "How do you want to name your bot?",
    default() {
      return "your-token-from-discord-api";
    },
  });

  botToken = answers.bot_token;
}

const botPreferQuestion = async () => {
  const answers = await inquirer.prompt({
    name: "botPrefer",
    type: "list",
    message: "What type of bot do you want to create?",
    choices: [
      {
        name: "Create a basic bot (faster)",
        value: "basic_bot",
      },
      {
        name: "Create a custom bot (recommended)",
        value: "custom_bot",
      },
    ],
  });

  return handleBotPrefer(answers.botPrefer);
};

const handleBotPrefer = async (botPrefer) => {
  if (botPrefer === "basic_bot") return basicBot();
  return customBot;
};

await askBotName();
await askBotToken();
await botPreferQuestion();
