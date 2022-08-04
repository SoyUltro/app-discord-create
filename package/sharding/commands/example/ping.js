const { Client, CommandInteraction, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
	name: "ping",
	description: "A simple ping command",
	/**,
	 * @param {Client} client
	 * @param {CommandInteraction} interaction
	 */
	run: async (client, interaction) => {
		try {
			const embed = new EmbedBuilder()
				.setTitle("Pong!")
				.setDescription(`${client.ws.ping}ms`)
				.setColor(Colors.Green);

			interaction.reply({ embeds: [embed] });
		} catch (e) {
			console.error(e);
		}
	}
};
