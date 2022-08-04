const { glob } = require("glob");
const { promisify } = require("util");

const globPromise = promisify(glob);

module.exports = async client => {
	const eventFiles = await globPromise(`${process.cwd()}/events/**/*.js`);
	eventFiles.map(value => require(value));

	const slashCommands = await globPromise(`${process.cwd()}/commands/**/*.js`);
	slashCommands.map(value => {
		const file = require(value);
		if (!file?.name) return;
		client.commands.set(file.name, file);
	});
};
