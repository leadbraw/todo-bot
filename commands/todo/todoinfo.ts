import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { Todo } from '../../index.ts'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('todoinfo')
		.setDescription('View the information of a todo list item.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the todo item.')
                .setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction) {
        const todoName = interaction.options.getString('name');
        // equivalent to: SELECT * FROM todo WHERE name = 'todoName' LIMIT 1;
        const todo = await Todo.findOne({ where: { name: todoName } });
        if (todo) {
            return interaction.reply(`${todoName} was created by ${todo.username} at ${todo.createdAt}`);
        }
        return interaction.reply({content: `Could not find item: ${todoName}`, flags: MessageFlags.Ephemeral});
    }
};