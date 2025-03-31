import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('marco')
		.setDescription('Replies with Polo!'),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply({content: 'Polo!', flags: MessageFlags.Ephemeral});
	},
};