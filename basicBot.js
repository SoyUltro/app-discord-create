import fs from "fs";
import { createSpinner } from "nanospinner";
import { botName, botToken } from "./index.js";
import {
  getEnv,
  getHandler,
  getIndex,
  getInteractionEvent,
  getPackage,
  getReadyEvent,
} from "./builds.js";

const basicBot = async () => {
  const directorySpinner = createSpinner("Creating new folders...").start();
  createFolders(directorySpinner);
};

const createFolders = async (spinner) => {
  try {
    const folderName = botName;

    if (!fs.existsSync(folderName)) {
      // Create package.json
      fs.mkdirSync(folderName);
      fs.writeFile(`${folderName}/package.json`, getPackage(botName), (err) => {
        if (err) throw err;
      });

      //Create index.js
      fs.writeFile(`${folderName}/index.js`, getIndex(), (err) => {
        if (err) throw err;
      });

      //Create .env
      fs.writeFile(`${folderName}/.env`, getEnv(botToken), (err) => {
        if (err) throw err;
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

      spinner.success({
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

export default basicBot;
