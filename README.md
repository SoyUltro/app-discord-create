# app-discord-create

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

π Create Discord Bot with CLI

## About
Are you tired of copy and paste your old codes of discord bots? Or just want to create bots more faster? Use this tool and easily create your Discord Bot!

## Use
```
npx app-discord-create
```

## Args
* `--modules`: Use this argument to specify if you want to us to create node_module folder.
* `--basic`: Set this argument if you want to create basic bot.
* `--shard`: Set this argument if you want to create a sharding bot.

Follow the instructions, this is easy!

## Basic Project
```
βββ node_modules
βββ events
β   ββclient
β     βββ ready.js
β     βββ interaction.js
βββ handler.js
βββ index.js
βββ package.json
βββ package-lock.json
βββ README.md
βββ .gitignore
```

## Sharding Project
```
βββ node_modules
βββ events
β   ββclient
β     βββ ready.js
β     βββ interaction.js
βββ handler.js
βββ bot.js
βββ index.js
βββ package.json
βββ package-lock.json
βββ README.md
βββ .gitignore
```