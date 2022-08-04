import fs from "fs";
import fse from "fs-extra";
import { createSpinner } from "nanospinner";
import { createModules } from "./index.js";
import { exec } from "child_process";

const shardingBot = async () => {
	//Starting spinners
	const directorySpinner = createSpinner("Creating new folders...").start();
	let nodeModulesSpinner;
	if (createModules) nodeModulesSpinner = createSpinner("Creating node_modules...").start();

	//Lauching the function
	createFolders(directorySpinner, nodeModulesSpinner);
};

const createFolders = async (directorySpinner, nodeModulesSpinner) => {
	try {
		const folderName = "Bot";

		if (!fs.existsSync(folderName)) {
			//Creating folder
			fs.mkdirSync(folderName);

			//Copying files -> ./package/sharding
			fse.copy("./package/sharding", `${folderName}`, err => {
				if (err) {
					directorySpinner.error({
						text: `Folder ${folderName} could not be created`
					});
					throw new Error(err);
				}
				directorySpinner.success({
					text: `Folder ${folderName} created successfully!`
				});
			});

			//Check if user wants to create node_modules
			if (createModules)
				exec("npm install", { cwd: "./" + folderName }, (err, stdout, stderr) => {
					if (err) {
						nodeModulesSpinner.error({
							text: "Node modules creation failed!"
						});
						throw new Error(err);
					}
					nodeModulesSpinner.success({
						text: "Node modules created successfully!"
					});
				});
		} else {
			spinner.error(`Folder ${folderName} already exist!`);
		}
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};

export default shardingBot;
