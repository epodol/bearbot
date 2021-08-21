import Command from '../command';

const monkey: Command = {
  name: 'monkey',
  description: 'Mmmmm Monkey',
  execute(interaction, args, author, commands, client) {
    interaction
      .reply({
        content:
          'https://tenor.com/view/hmmm-mmmm-monkey-turtle-kung-fu-panda-gif-17129341',
      })
      .catch(console.error);
  },
};

export default monkey;
