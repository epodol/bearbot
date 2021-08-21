import Discord from 'discord.js';
import Command from '../command';

const help: Command = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  options: [
    {
      name: 'command',
      description: 'Get details about a specific command.',
      type: 3,
      required: false,
    },
  ],
  async execute(interaction, args, author, commands, client) {
    if (args.getString('command') === null) {
      const commandList = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR as any)
        .setTitle(`Bear Commands!`)
        .setDescription(
          `Want to suggest a command? Go to https://github.com/epodol/bearbot/issues/new`
        )
        .setTimestamp();

      for (const [key, value] of Object.entries(commands)) {
        commandList.addField(`\`${value.name}\``, value.description, false);
      }

      interaction
        .reply({
          embeds: [commandList],
          ephemeral: true,
        })
        .catch(console.error);
    } else {
      const name = args.getString('command')?.toLowerCase();
      if (typeof name === 'undefined') {
        return interaction
          .reply({
            content: `The command \`${args.getString(
              'command'
            )}\` does not exist!`,
            ephemeral: true,
          })
          .catch(console.error);
        // End
      }
      const command = commands[name];

      if (!command) {
        interaction
          .reply({
            content: `The command \`${args.getString(
              'command'
            )}\` does not exist!`,
            ephemeral: true,
          })
          .catch(console.error);
      } else {
        const help = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`\`${command.name}\``)
          .setDescription(command.description)
          .setTimestamp();

        interaction
          .reply({
            embeds: [help],
            ephemeral: true,
          })
          .catch(console.error);
      }
    }
  },
};

export default help;
