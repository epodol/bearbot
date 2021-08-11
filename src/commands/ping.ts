module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute() {
    const response = {
      data: {
        type: 4,
        data: {
          content: `Pong!`,
        },
      },
    };
    return response;
  },
};
