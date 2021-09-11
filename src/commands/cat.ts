import Discord from 'discord.js';
import fetch from 'node-fetch';
import Command from '../command';

const cat: Command = {
  name: 'cat',
  description: 'Finds a random cat picture.',
  options: [
    {
      name: 'number',
      description: 'The number of cat pictures to return',
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
  ],
  async execute(interaction, args, author, commands, client) {
    const number = args.getInteger('number');

    interface Cat {
      url: string;
      [key: string]: any;
    }

    const fetchResponse = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${number || '1'}`
    );
    const data: Cat[] = (await fetchResponse.json()) as any;

    const catArray: Discord.MessageEmbed[] = [];
    data.forEach((catData) => {
      const embed = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR as any)
        .setTitle('Cat Picture!')
        .setImage(catData.url)
        .setTimestamp();
      catArray.push(embed);
    });

    interaction
      .reply({
        embeds: catArray,
      })
      .catch(console.error);
  },
};

export default cat;
