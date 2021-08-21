import Command from '../command';

const ping: Command = {
  name: 'ping',
  description: 'Ping!',
  async execute(interaction, args, author, commands, client) {
    await interaction
      .reply({
        content: `Pinging... ${Date.now()}`,
      })
      .catch(console.error);

    const diff =
      Date.now() -
      parseInt((await interaction.fetchReply()).content.substr(11));

    interaction
      .editReply({
        content: `Pong! \`${diff}\`ms`,
      })
      .catch(console.error);
  },
};

export default ping;
