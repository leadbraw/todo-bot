import { EmbedBuilder, Guild, GuildTextBasedChannel, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
        const channel: GuildTextBasedChannel = interaction.channel;
        const guild: Guild = interaction.guild;
        const serverEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(guild.name)
            .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
            // TODO: Make this line shorter. Displays creation date via discord timestamps.
            .setDescription(`Creation date: <t:${Math.floor(guild.createdAt.getTime() / 1000)}:D> (<t:${Math.floor(guild.createdAt.getTime() / 1000)}:R>)`)
            .setThumbnail(guild.iconURL())
            .addFields(
                // first row
                { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
                { name: 'Members', value: `${guild.memberCount}`, inline: true },
                { name: 'Channels', value: `${guild.channels.channelCountWithoutThreads}`, inline: true},
                // second row
                { name: 'Design', value: `Icon: [Click here](${guild.iconURL()})`, inline: true},
                { name: 'Info', value: `Verification: ${guild.verificationLevel}
                                        Boosts: ${guild.premiumSubscriptionCount}`, inline: true},
                { name: 'Counts', value: `Roles: ${guild.roles.cache.size}
                                          Emojis: ${guild.emojis.cache.size}`, inline: true}
            )
            .setTimestamp()
            .setFooter({ text: `Guild ID: ${guild.id}` });
        interaction.reply({ embeds: [serverEmbed] });
	}
};