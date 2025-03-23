import { MessageFlags, SlashCommandBuilder } from 'discord.js';
import { Todo } from '../../index.ts'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtodo')
		.setDescription('Adds a todo list item.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the todo item.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The description of the todo item.')
                .setRequired(true)),
	async execute(interaction) {
        const todoName = interaction.options.getString('name');
		const todoDescription = interaction.options.getString('description');
		try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const todo = await Todo.create({
				name: todoName,
				description: todoDescription,
				username: interaction.user.username,
			});
			return interaction.reply(`Item added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.reply({content: 'That todo title already exists.', flags: MessageFlags.Ephemeral});
			}
			return interaction.reply({content: 'Something went wrong with adding an item.', flags: MessageFlags.Ephemeral});
		}
	}
};