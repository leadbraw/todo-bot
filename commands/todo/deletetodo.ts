import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { Todo } from '../../index.ts'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletetodo')
		.setDescription('Delete a todo list item.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the todo item.')
                .setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction) {
        const todoName: string | null = interaction.options.getString('name');
        // equivalent to: DELETE from todo WHERE name = ?;
        const rowCount = await Todo.destroy({ where: { name: todoName } });
        if (!rowCount) {
            return interaction.reply({content: 'That item doesn\'t exist.', flags: MessageFlags.Ephemeral});
        }
        return interaction.reply({content: 'Todo item deleted.', flags: MessageFlags.Ephemeral});
    }
};