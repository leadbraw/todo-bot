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
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.defaultAvatarURL })
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/OrNGRgy.png')
            .addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
            .setImage('https://i.imgur.com/OrNGRgy.png')
            .setTimestamp()
            .setFooter({ text: interaction.guild.name, iconURL: 'https://i.imgur.com/OrNGRgy.png' });
        channel.send({ embeds: [serverEmbed] });
		// interaction.guild is the object representing the Guild in which the command was run
		await interaction.reply(`This server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
	},
};