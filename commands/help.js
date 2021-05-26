const Discord = require('discord.js');

module.exports = {
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
  async execute(args, author, interaction, client) {
    const { commands } = client;
    let returnValue;

    if (typeof args === 'undefined' || args.length === 0) {
      const commandList = new Discord.MessageEmbed()
        .setColor(process.env.BOT_COLOR)
        .setTitle(`Bear Commands!`)
        .setDescription(
          `Want to suggest a command? Go to https://github.com/epodol/bearbot/issues/new`
        )
        .setTimestamp();
      commands.map((command) =>
        commandList.addField(`\`${command.name}\``, command.description, false)
      );

      returnValue = {
        data: {
          type: 4,
          data: {
            embeds: [commandList],
          },
        },
      };
    } else {
      const name = args[0].value.toLowerCase();
      const command =
        commands.get(name) ||
        commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        returnValue = {
          data: {
            type: 4,
            data: {
              content: `The command \`${args[0].value}\` does not exist!`,
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

        returnValue = {
          data: {
            type: 4,
            data: {
              embeds: [help],
            },
          },
        };
      }
    }
    return returnValue;
  },
};
