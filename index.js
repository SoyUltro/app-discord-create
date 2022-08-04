#!/usr/bin/env node
import inquirer from "inquirer";
import basicBot from "./basicBot.js";
import shardingBot from "./shardingBot.js";

const args = process.argv.slice(2);

export let createModules;

const botTypeQuestion = async () => {
	const answers = await inquirer.prompt({
		name: "botType",
		type: "list",
		message: "What type of bot do you want to create?",
		choices: [
			{
				name: "Create a basic bot (recommended)",
				value: "basic_bot"
			},
			{
				name: "Create a sharding bot",
				value: "sharding_bot"
			}
		]
	});

	return handleBotType(answers.botType);
};

const handleBotType = async botPrefer => {
	if (botPrefer === "basic_bot") return basicBot();
	if (botPrefer === "sharding_bot") return shardingBot();
	throw new Error("Invalid bot type");
};

const askCreateModules = async () => {
	const answers = await inquirer.prompt({
		name: "create_modules",
		type: "list",
		message: "Do you want to us to generate node_modules automatically?",
		choices: [
			{
				name: "Yes",
				value: true
			},
			{
				name: "No",
				value: false
			}
		]
	});

	createModules = answers.create_modules;
};

if (args.length === 0) {
	await askCreateModules();
	await botTypeQuestion();
} else {
	if (args.find(arg => arg === "--modules")) createModules = true;
	else createModules = false;
	if (args.find(arg => arg === "--basic")) basicBot();
	else if (args.find(arg => arg === "--shard")) shardingBot();
	else await botTypeQuestion();
}
