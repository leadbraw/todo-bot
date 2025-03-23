import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Gives the bot\'s ping.'),
	async execute(interaction) {
		const sent = await interaction.reply('Pong!');
        interaction.editReply(`Pong!\nWebsocket heartbeat: ${interaction.client.ws.ping} ms\nRoundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp} ms`)
	},
};