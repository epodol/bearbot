module.exports = {
  name: 'github',
  description: "Display the bot's GitHub URL.",
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
            'You can view my GitHub repo here: https://github.com/epodol/bearbot',
        },
      },
    };
    return response;
  },
};
