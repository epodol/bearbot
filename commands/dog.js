const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
  name: 'dog',
  description: 'Finds a random dog picture.',
  cooldown: 3,
  guildOnly: false,
  permissions: '',
  async execute() {
    const image = await fetch('https://dog.ceo/api/breeds/image/random');
    const { message: url } = await image.json();

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.BOT_COLOR)
      .setTitle('Dog Picture!')
      .setImage(url)
      .setTimestamp();

    const response = {
      data: {
        type: 4,
        data: {
          embeds: [embed],
        },
      },
    };
    return response;
  },
};
