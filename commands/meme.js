const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
  name: 'meme',
  description: 'Returns a random meme from Reddit.',
  aliases: ['mem', 'redditmeme', 'joke'],
  usage: '',
  cooldown: 3,
  guildOnly: false,
  permissions: '',
  async execute(message) {
    const fetchResponse = await fetch('https://meme-api.herokuapp.com/gimme');
    const { url, title, postLink, author, ups, nsfw } =
      await fetchResponse.json();
    if (nsfw && !(message.channel.nsfw || message.channel.type === 'dm'))
      return message.reply(
        'Uh oh! This meme is NSFW. You must be in a NSFW channel to see it.'
      );
    const memeEmbed = new Discord.MessageEmbed()
      .setColor(process.env.BOT_COLOR)
      .setTitle(title)
      .setURL(postLink)
      .setDescription(`${ups} Upvotes.`)
      .setImage(url)
      .setTimestamp()
      .setFooter(
        `Posted by ${author} on Reddit`,
        'https://www.redditinc.com/assets/images/site/reddit-logo.png'
      );

    const response = {
      data: {
        type: 4,
        data: {
          embeds: [memeEmbed],
        },
      },
    };
    return response;
  },
};
