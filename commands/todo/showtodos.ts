import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { Pagination } from 'pagination.djs';
import { Todo } from '../../index.ts'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('showtodos')
		.setDescription('Show all of your todo items.'),
	async execute(interaction: ChatInputCommandInteraction) {
        const username = interaction.user.username;
        // Fetches the name, description, and creation date of all items created by the user.
        const todoList = await Todo.findAll({ attributes: ['name', 'description', 'createdAt'],  where: { username: username } });
        if (todoList && todoList.length) {
            const pagination = new Pagination(interaction);
            const embeds: EmbedBuilder[] = [];

            for (const todo of todoList) {
                const embed = new EmbedBuilder()
                    .setTitle(`${todo.name}`)
                    .setDescription(`${todo.description}`)
                    .setFooter({ text: `Created ${todo.createdAt.toDateString()}` })
                    .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() });
                embeds.push(embed);
            }

            // TODO: find a way to preserve todo item privacy.
            pagination.setEmbeds(embeds);
            await pagination.render();
        } else {
            await interaction.reply({content: 'You have no todo items!', flags: MessageFlags.Ephemeral});
        }
    }
};