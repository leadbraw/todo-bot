import { MessageFlags, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Repeats a message back to you!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back.')
                .setRequired(true))
        .addBooleanOption(option =>
            option.setName('ephemeral')
                .setDescription('Whether the output should be ephemeral. True by default.')
                .setRequired(false)),
	async execute(interaction) {
        const ephemeralValue: boolean = interaction.options.getBoolean('ephemeral') ?? true;
        const inputMessage: string = interaction.options.getString('input');
		await interaction.reply({content: inputMessage, flags: ephemeralValue ? MessageFlags.Ephemeral : undefined});
	},
};