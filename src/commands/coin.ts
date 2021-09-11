import Command from '../command';

const coin: Command = {
  name: 'coin',
  description: 'Flips a coin.',
  execute(interaction, args, author, commands, client) {
    interaction
      .reply({
        content: `It was ${Math.random() < 0.5 ? 'heads!' : 'tails!'}`,
      })
      .catch(console.error);
  },
};

export default coin;
