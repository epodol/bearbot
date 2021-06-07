const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
  name: 'meme',
  description: 'Returns a random meme from Reddit.',
  options: [
    {
      name: 'number',
      description: 'The number of memes to return',
      type: 4,
      choices: [
        {
          name: '1',
          value: 1,
        },
        {
          name: '2',
          value: 2,
        },
        {
          name: '3',
          value: 3,
        },
        {
          name: '4',
          value: 4,
        },
        {
          name: '5',
          value: 5,
        },
        {
          name: '6',
          value: 6,
        },
        {
          name: '7',
          value: 7,
        },
        {
          name: '8',
          value: 8,
        },
        {
          name: '9',
          value: 9,
        },
        {
          name: '10',
          value: 10,
        },
      ],
    },
    {
      name: 'source',
      description: 'The subreddit to get the meme from',
      type: 3,
      choices: [
        {
          name: 'r/memes',
          value: 'memes',
        },
        {
          name: 'r/dankmemes',
          value: 'dankmemes',
        },
        {
          name: 'r/me_irl',
          value: 'me_irl',
        },
      ],
    },
  ],
  async execute(args) {
    if (typeof args === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      args = [
        { value: 1, type: 4, name: 'number' },
        { value: 'memes', type: 3, name: 'source' },
      ];
    }

    let source;
    let number;

    args.forEach((arg) => {
      if (arg.name === 'source') source = arg.value;
      if (arg.name === 'number') number = arg.value;
    });

    const fetchResponse = await fetch(
      `https://meme-api.herokuapp.com/gimme/${source || 'memes'}/${number || 1}`
    );
    const { count, memes } = await fetchResponse.json();

    const memeArray = [];
    while (memeArray.length < count) {
      if (memes[memeArray.length].nsfw)
        return {
          data: {
            type: 4,
            data: {
              content: 'Uh oh! This meme is NSFW.',
            },
          },
        };
      const memeEmbed = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR)
        .setTitle(memes[memeArray.length].title)
        .setURL(memes[memeArray.length].postLink)
        .setDescription(`${memes[memeArray.length].ups} Upvotes.`)
        .setImage(memes[memeArray.length].url)
        .setTimestamp()
        .setFooter(
          `Posted by ${memes[memeArray.length].author} on Reddit`,
          'https://www.redditinc.com/assets/images/site/reddit-logo.png'
        );

      memeArray.push(memeEmbed);
    }

    const response = {
      data: {
        type: 4,
        data: {
          embeds: memeArray,
        },
      },
    };
    return response;
  },
};
