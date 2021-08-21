import Discord, { MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';
import Command from '../command';

const meme: Command = {
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
  async execute(interaction, args, author, commands, client) {
    const source = args.getString('source') || 'memes';
    const number = args.getInteger('number') || 1;

    const fetchResponse = await fetch(
      `https://meme-api.herokuapp.com/gimme/${source || 'memes'}/${number || 1}`
    );
    const { count, memes } = await fetchResponse.json();

    const memeArray: MessageEmbed[] = [];
    while (memeArray.length < count) {
      if (memes[memeArray.length].nsfw)
        return interaction
          .reply({
            content: 'Uh oh! This meme is NSFW.',
            ephemeral: true,
          })
          .catch(console.error);
      const memeEmbed = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR as any)
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

    interaction
      .reply({
        embeds: memeArray,
      })
      .catch(console.error);
  },
};

export default meme;
