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
  async execute(interaction, args, author, commands) {
    if (args.getString('command') === undefined) {
      const commandList = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR as any)
        .setTitle(`Bear Commands!`)
        .setDescription(
          `Want to suggest a command? Go to https://github.com/epodol/bearbot/issues/new`
        )
        .setTimestamp();
      commands.map((command: Command) =>
        commandList.addField(`\`${command.name}\``, command.description, false)
      );

      return {
        data: {
          type: 4,
          data: {
            embeds: [commandList],
          },
        },
      };
    } else {
      const name = args.getString('command')?.toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c: any) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return {
          data: {
            type: 4,
            data: {
              content: `The command \`${args.getString(
                'command'
              )}\` does not exist!`,
            },
          },
        };
      } else {
        const help = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`\`${command.name}\``)
          .setDescription(command.description)
          .addFields(
            {
              name: 'Server Only?',
              value: command.guildOnly ? 'Yes' : 'No',
              inline: true,
            },
            {
              name: 'Permissions?',
              value:
                typeof command?.permissions === 'object'
                  ? `\`${command.permissions.join('` `')}\``
                  : 'None!',
              inline: true,
            }
          )
          .setTimestamp();

        return {
          data: {
            type: 4,
            data: {
              embeds: [help],
            },
          },
        };
      }
    }
  },
};

export default help;
