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
            // TODO: make this line shorter :v
            .setDescription(`Creation date: <t:${Math.floor(interaction.guild.createdAt.getTime() / 1000)}:D> (<t:${Math.floor(interaction.guild.createdAt.getTime() / 1000)}:R>)`)
            .setThumbnail(interaction.guild.iconURL())
            .addFields(
                // first row
                { name: 'Owner', value: `<@${interaction.guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${interaction.guild.memberCount}`, inline: true },
                { name: 'Channels', value: `${interaction.guild.channels.channelCountWithoutThreads}`, inline: true},
                // second row
                { name: 'Design', value: `Icon: [Click here](${interaction.guild.iconURL()})`, inline: true},
                { name: 'Info', value: `Verification: ${interaction.guild.verificationLevel}
                                        Boosts: ${interaction.guild.premiumSubscriptionCount}`, inline: true},
                { name: 'Counts', value: `Roles: ${interaction.guild.roles.cache.size}
                                          Emojis: ${interaction.guild.emojis.cache.size}`, inline: true}
            )
            .setTimestamp()
            .setFooter({ text: `Guild ID: ${interaction.guild.id}` });
        interaction.reply({ embeds: [serverEmbed] });
	}
};