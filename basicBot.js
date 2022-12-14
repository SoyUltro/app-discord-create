import path from "path";
import fs from "fs";
import fse from "fs-extra";
import { fileURLToPath } from "url";
import { createSpinner } from "nanospinner";
import { createModules } from "./index.js";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basicBot = async () => {
	//Starting spinners
	const directorySpinner = createSpinner("Creating new folders...").start();
	let nodeModulesSpinner;
	if (createModules) nodeModulesSpinner = createSpinner("Creating node_modules...").start();

	createFolders(directorySpinner, nodeModulesSpinner);
};

const createFolders = async (directorySpinner, nodeModulesSpinner) => {
	try {
		const folderName = "Bot";

		if (!fs.existsSync(folderName)) {
			//Creating folder
			fs.mkdirSync(folderName);

			//Copying files -> ./package/basic
			fse.copy(path.join(__dirname, "/package/basic"), `${folderName}`, err => {
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

			if (createModules) {
				exec("npm install", { cwd: path.join(__dirname, folderName) }, (err, stdout, stderr) => {
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
			}
		} else {
			directorySpinner.error({
				text: `Folder ${folderName} already exist!`
			});
			process.exit(1);
		}
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};

export default basicBot;
