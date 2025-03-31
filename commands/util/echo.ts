import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';

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
	async execute(interaction: ChatInputCommandInteraction) {
        const ephemeralValue: boolean = interaction.options.getBoolean('ephemeral') ?? true;
        let inputMessage: string | null = interaction.options.getString('input');
        if (inputMessage === null) {
            inputMessage = "";
        }
		await interaction.reply({content: inputMessage, flags: ephemeralValue ? MessageFlags.Ephemeral : undefined});
	},
};