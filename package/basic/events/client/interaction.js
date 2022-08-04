const { InteractionType } = require("discord.js");
const client = require("../../index");

client.on("interactionCreate", interaction => {
	if (interaction.type == InteractionType.ApplicationCommand) {
		const command = client.commands.get(interaction.commandName);
		if (!command)
			return interaction.reply({
				content: "An unexpected error has occurred",
				ephemeral: true
			});

		interaction.member = interaction.guild.members.cache.get(interaction.user.id);

		command.run(client, interaction);
	}
});
