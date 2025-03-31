import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { Todo } from '../../index.ts'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('edittodo')
		.setDescription('Edit the description of a todo list item.')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('The name of the todo item.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('The new description of the todo item.')
                .setRequired(true)),
	async execute(interaction: ChatInputCommandInteraction) {
        const todoName: string | null = interaction.options.getString('name');
        const todoDescription: string | null = interaction.options.getString('description');
        // equivalent to: UPDATE todo (description) values (?) WHERE name='?';
        const affectedRows: [AffectedCount: number] = await Todo.update({ description: todoDescription }, { where: { name: todoName } });
        if (affectedRows) {
            return interaction.reply({content: `Item ${todoName} was edited.`, flags: MessageFlags.Ephemeral});
        }
        return interaction.reply({content: `Could not find a tag with name ${todoName}!`, flags: MessageFlags.Ephemeral});
    }
};