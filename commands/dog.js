const fetch = require('node-fetch');
const Discord = require('discord.js');

module.exports = {
  name: 'dog',
  description: 'Finds a random dog picture.',
  options: [
    {
      name: 'number',
      description: 'The number of dog pictures to return',
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
      name: 'breed',
      description: 'The breed of dog',
      type: 3,
    },
  ],
  async execute(args) {
    // eslint-disable-next-line no-param-reassign
    args = args || [];

    let breed;
    let number;

    args.forEach((arg) => {
      if (arg.name === 'breed') breed = arg.value.toLowerCase();
      if (arg.name === 'number') number = arg.value;
    });

    const url = breed
      ? `https://dog.ceo/api/breed/${breed}/images/random/${number || 1}`
      : `https://dog.ceo/api/breeds/image/random/${number || 1}`;

    const image = await fetch(url);

    const res = await image.json();
    if (res?.code === 404) {
      const response = {
        data: {
          type: 4,
          data: {
            content: "I don't know that breed. Try using a more broad term.",
          },
        },
      };
      return response;
    }
    const { message: images } = res;
    const imageEmbeds = [];
    images.forEach((imageURL) => {
      const embed = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR)
        .setTitle('Dog Picture!')
        .setImage(imageURL)
        .setTimestamp();
      imageEmbeds.push(embed);
    });

    const response = {
      data: {
        type: 4,
        data: {
          embeds: imageEmbeds,
        },
      },
    };
    return response;
  },
};
