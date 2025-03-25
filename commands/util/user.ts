import { EmbedBuilder, Guild, GuildTextBasedChannel, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
        const channel: GuildTextBasedChannel = interaction.channel;
        const guild: Guild = interaction.guild;
        const serverEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(interaction.user.username)
            .setThumbnail(interaction.user.avatarURL())
            // TODO: Make these line shorter. Displays creation date and join date via discord timestamps.
            .addFields(
                { name: 'Creation date', value: `<t:${Math.floor(interaction.user.createdTimestamp / 1000)}:D> (<t:${Math.floor(interaction.user.createdTimestamp / 1000)}:R>)` },
                { name: 'Join date', value: `<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:D> (<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:R>)` }
            )
            .setTimestamp()
            .setFooter({ text: `User ID: ${interaction.user.id}` });
        interaction.reply({ embeds: [serverEmbed] });
	},
};