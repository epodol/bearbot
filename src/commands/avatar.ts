import { MessageEmbed, User } from 'discord.js';
import Command from '../command';

const avatar: Command = {
  name: 'avatar',
  description: "Get a user's avatar.",
  options: [
    {
      name: 'user',
      description: "Get the user's avatar by mentioning the user!",
      type: 1,
      options: [
        {
          name: 'user',
          description: 'The user',
          type: 6,
          required: true,
        },
      ],
    },
    {
      name: 'user-id',
      description: "Get the user's avatar using User ID",
      type: 1,
      options: [
        {
          name: 'uid',
          description: 'The user ID',
          type: 3,
          required: true,
        },
      ],
    },
  ],
  async execute(interaction, args, author, commands, client) {
    let user: User | void | null;
    if (args.getSubcommand() === 'user') user = args.getUser('user');
    else if (args.getSubcommand() === 'user-id') {
      const userID = args.getString('uid');
      if (userID === null) {
        return interaction.reply({
          ephemeral: true,
          content: 'User not found',
        });
      }
      user = await client.users.fetch(userID).catch((err) => {
        return interaction.reply({
          ephemeral: true,
          content: "I couldn't find that user.",
        });
      });
    }

    if (!user) {
      return interaction.reply({
        ephemeral: true,
        content: "I couldn't find that user.",
      });
    }

    const avatarEmbed = new MessageEmbed()
      .setColor(process.env.BOT_COLOR as any)
      .setAuthor(`${user.username}'s Avatar`)
      .setImage(user.displayAvatarURL({ dynamic: true }));
    interaction
      .reply({
        embeds: [avatarEmbed],
      })
      .catch(console.error);
  },
};

export default avatar;
