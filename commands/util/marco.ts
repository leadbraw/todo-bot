import { SlashCommandBuilder } from 'discord.js';

export default {
	data: new SlashCommandBuilder()
		.setName('marco')
		.setDescription('Replies with Polo!'),
	async execute(interaction) {
		await interaction.reply('Polo!');
	},
};