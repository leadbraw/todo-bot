import { MessageFlags, SlashCommandBuilder } from 'discord.js';
import { Todo } from '../../index.ts'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletetodo')
		.setDescription('Delete a todo list item.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the todo item.')
                .setRequired(true)),
	async execute(interaction) {
        const todoName: string = interaction.options.getString('name');
        // equivalent to: DELETE from todo WHERE name = ?;
        const rowCount = await Todo.destroy({ where: { name: todoName } });
        if (!rowCount) {
            return interaction.reply('That item doesn\'t exist.');
        }
        return interaction.reply('Todo item deleted.');
    }
};