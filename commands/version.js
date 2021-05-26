module.exports = {
  name: 'version',
  description: "Display the current bot's version.",
  aliases: ['v', 'ver'],
  usage: '',
  cooldown: 0,
  guildOnly: false,
  permissions: '',
  execute() {
    const response = {
      data: {
        type: 4,
        data: {
          content: `I'm currently running version \`${process.env.npm_package_version}\``,
        },
      },
    };
    return response;
  },
};
