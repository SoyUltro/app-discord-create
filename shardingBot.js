import fs from "fs";
import { createSpinner } from "nanospinner";
import { botName, botToken, createModules } from "./index.js";
import { exec } from "child_process";
import {
  getEnv,
  getHandler,
  getIndex,
  getInteractionEvent,
  getPackage,
  getReadyEvent,
  getShardingIndex,
} from "./builds.js";

const shardingBot = async () => {
  //Starting spinners
  const directorySpinner = createSpinner("Creating new folders...").start();
  let nodeModulesSpinner;
  if (createModules)
    nodeModulesSpinner = createSpinner("Creating node_modules...").start();
  const indexCreationSpinner = createSpinner("Creating index.js...").start();
  const botCreationSpinner = createSpinner("Creating bot.js...").start();
  const envCreationSpinner = createSpinner("Creating .env...").start();
  const eventsSpinner = createSpinner("Creating events...").start();

  createFolders(
    directorySpinner,
    nodeModulesSpinner,
    indexCreationSpinner,
    botCreationSpinner,
    envCreationSpinner,
    eventsSpinner
  );
};

const createFolders = async (
  directorySpinner,
  nodeModulesSpinner,
  indexCreationSpinner,
  botCreationSpinner,
  envCreationSpinner,
  eventsSpinner
) => {
  try {
    const folderName = botName;

    if (!fs.existsSync(folderName)) {
      // Create package.json
      fs.mkdirSync(folderName);
      fs.writeFile(`${folderName}/package.json`, getPackage(botName), (err) => {
        if (err) throw err;
      });

      if (createModules) {
        exec(
          "npm install",
          { cwd: "./" + folderName },
          (err, stdout, stderr) => {
            if (err) throw err;
            nodeModulesSpinner.success({
              text: "Node modules created successfully!",
            });
          }
        );
      }

      //Create index.js
      fs.writeFile(`${folderName}/index.js`, getShardingIndex(), (err) => {
        if (err) throw err;
      });
      indexCreationSpinner.success({
        text: "index.js created successfully!",
      });

      //Create bot.js
      fs.writeFile(`${folderName}/bot.js`, getIndex(), (err) => {
        if (err) throw err;
      });
      botCreationSpinner.success({
        text: "bot.js created successfully!",
      });

      //Create .env
      fs.writeFile(`${folderName}/.env`, getEnv(botToken), (err) => {
        if (err) throw err;
      });
      envCreationSpinner.success({
        text: ".env created successfully!",
      });

      //Create handler.js
      fs.writeFile(`${folderName}/handler.js`, getHandler(), (err) => {
        if (err) throw err;
      });

      //Create events folder
      fs.mkdirSync(`${folderName}/events`);
      fs.mkdirSync(`${folderName}/events/client`);
      //Create ready event
      fs.writeFile(
        `${folderName}/events/client/ready.js`,
        getReadyEvent(botName),
        (err) => {
          if (err) throw err;
        }
      );
      //Create interaction event
      fs.writeFile(
        `${folderName}/events/client/interaction.js`,
        getInteractionEvent(),
        (err) => {
          if (err) throw err;
        }
      );

      eventsSpinner.success({
        text: "events created successfully!",
      });

      directorySpinner.success({
        text: "Folders created successfully!",
      });
    } else {
      spinner.error("Folder src already exist!");
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default shardingBot;
