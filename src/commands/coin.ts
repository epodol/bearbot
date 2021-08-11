import Command from '../command';

const coin: Command = {
  name: 'coin',
  description: 'Flips a coin.',
  execute(interaction, args, author, commands) {
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

export default coin;
