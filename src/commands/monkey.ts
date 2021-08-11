module.exports = {
  name: 'monkey',
  description: 'Mmmmm Monkey',
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
