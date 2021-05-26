module.exports = {
  name: 'coin',
  description: 'Flips a coin.',
  aliases: ['toss', 'flip'],
  usage: '',
  cooldown: 0,
  guildOnly: false,
  permissions: '',
  execute() {
    const response = {
      data: {
        type: 4,
        data: {
          content: `It was ${Math.random() < 0.5 ? 'heads!' : 'tails!'}`,
        },
      },
    };
    return response;
  },
};
