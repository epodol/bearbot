const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
  name: 'cat',
  description: 'Finds a random cat picture.',
  cooldown: 3,
  guildOnly: false,
  permissions: '',
  async execute() {
    const fetchResponse = await fetch(
      'https://api.thecatapi.com/v1/images/search'
    );
    const data = await fetchResponse.json();

    const embed = new Discord.MessageEmbed()
      .setColor(process.env.BOT_COLOR)
      .setTitle('Cat Picture!')
      .setImage(data[0].url)
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
