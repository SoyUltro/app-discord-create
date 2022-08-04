# app-discord-create

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

🚀 Create Discord Bot with CLI

## About
Are you tired of copy and paste your old codes of discord bots? Or just want to create bots more faster? Use this tool and easily create your Discord Bot!

## Use
```
npx app-discord-create
```

## Args (Optional)
* `--modules`: Use this argument to specify if you want to us to create node_module folder.
* `--basic`: Set this argument if you want to create basic bot.
* `--shard`: Set this argument if you want to create a sharding bot.

Follow the instructions, this is easy!

## Basic Project
```
├── node_modules
├── events
│   └─client
│     ├── ready.js
│     └── interaction.js
├── commands
│   └─example
│     └── ping.js
├── handler.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```

## Sharding Project
```
├── node_modules
├── events
│   └─client
│     ├── ready.js
│     └── interaction.js
├── commands
│   └─example
│     └── ping.js
├── handler.js
├── bot.js
├── index.js
├── package.json
├── package-lock.json
├── README.md
└── .gitignore
```