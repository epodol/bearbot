const Discord = require('discord.js');

module.exports = {
  name: 'avatar',
  description: "Get a user's avatar.",
  options: [
    {
      name: 'user',
      description: "Get the user's avatar by mentioning the user",
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
  async execute(args, member, interaction, client) {
    const user = await client.users
      .fetch(args[0].options[0].value)
      .catch((err) => err);

    if (user?.httpStatus === 404)
      return {
        data: {
          type: 4,
          data: {
            content:
              'Uh Oh! I couldn\'t find that user! Be sure to use the User\'s ID found by turning on developer mode, right clicking on the user, and selecting "Copy ID"',
          },
        },
      };
    const avatarEmbed = new Discord.MessageEmbed()
      .setColor(process.env.BOT_COLOR)
      .setAuthor(`${user.username}'s Avatar`)
      .setImage(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
      );
    const response = {
      data: {
        type: 4,
        data: {
          embeds: [avatarEmbed],
        },
      },
    };
    return response;
  },
};
