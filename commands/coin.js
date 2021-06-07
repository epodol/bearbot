module.exports = {
  name: 'coin',
  description: 'Flips a coin.',
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
