import Command from '../command';

const monkey: Command = {
  name: 'version',
  description: "Display the current bot's version.",
  execute(interaction, args, author, commands, client) {
    interaction
      .reply({
        content: `I'm currently running version \`${process.env.npm_package_version}\`\n[Learn more about this version here](https://github.com/epodol/bearbot/releases/tag/v${process.env.npm_package_version}).`,
      })
      .catch(console.error);
  },
};

export default monkey;
