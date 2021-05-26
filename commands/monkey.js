module.exports = {
  name: 'monkey',
  description: "Display the current bot's version.",
  aliases: ['mmm', 'mmmmm'],
  usage: '',
  cooldown: 0,
  guildOnly: false,
  permissions: '',
  execute() {
    const response = {
      data: {
        type: 4,
        data: {
          content:
            'https://tenor.com/view/hmmm-mmmm-monkey-turtle-kung-fu-panda-gif-17129341',
        },
      },
    };
    return response;
  },
};
