import { MessageFlags, SlashCommandBuilder } from 'discord.js';
import { Todo } from '../../index.ts'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showtodos')
		.setDescription('Show all of your todo items.'),
	async execute(interaction) {
        const username = interaction.user.username;
        // Fetches the name and description of all items created by the user.
        const todoList = await Todo.findAll({ attributes: ['name', 'description'],  where: { username: username } });
        if (todoList && todoList.length) {
            let todoString: string = '';
            for (const todo of todoList) {
                todoString += `${todo.name}, ${todo.description}\n`
            }
            return interaction.reply(`List of items:\n${todoString}`);
        }
        return interaction.reply({content: 'You have no todo items!', flags: MessageFlags.Ephemeral});
    }
};