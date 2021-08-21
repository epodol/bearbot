import Command from '../command';

const github: Command = {
  name: 'github',
  description: "Display the bot's GitHub URL.",
  execute(interaction, args, author, commands, client) {
    interaction
      .reply({
        content:
          'You can view my GitHub repo here: https://github.com/epodol/bearbot',
      })
      .catch(console.error);
  },
};

export default github;
