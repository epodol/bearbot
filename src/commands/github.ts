import Command from '../command';

const github: Command = {
  name: 'github',
  description: "Display the bot's GitHub URL.",
  execute(interaction, args, author, commands) {
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

export default github;
