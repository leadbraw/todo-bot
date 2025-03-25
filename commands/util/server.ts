import { EmbedBuilder, GuildTextBasedChannel, SlashCommandBuilder, TextBasedChannel } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
        const channel: GuildTextBasedChannel = interaction.channel;
        const serverEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(interaction.guild.name)
            .setURL('https://github.com/leadbraw')
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            .setDescription('Some description here')
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' }, // adding space
                { name: 'Member count', value: `${interaction.guild.memberCount}`, inline: true },
                { name: 'Channel count', value: `${interaction.guild.channels.channelCountWithoutThreads}`, inline: true },
                { name: 'Creation date', value: `${interaction.guild.createdAt.toDateString()}`}
            )
            .setTimestamp()
            .setFooter({ text: interaction.user.username, iconURL: interaction.user.avatarURL() });
        channel.send({ embeds: [serverEmbed] });
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};