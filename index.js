require('dotenv').config({ path: 'config' });
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client({
  presence: {
    activity: { name: 'Slash Commands', type: 'WATCHING' },
    status: 'online',
  },
});
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

// eslint-disable-next-line no-restricted-syntax
for (const file of commandFiles) {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

if (process.env.BOT_COLOR === '') process.env.BOT_COLOR = '#0099ff';

client.once('ready', () => {
  // Add Slash Commands to Dev Server
  if (process.env.DEV_SERVER_ID !== '') {
    client.api
      .applications(client.user.id)
      .guilds(process.env.DEV_SERVER_ID)
      .commands.get()
      .then((commands) => {
        commands.forEach((command) => {
          if (!client.commands.has(command.name)) {
            console.log(`deleting the ${command.name} command`);
            client.api
              .applications(client.user.id)
              .guilds(process.env.DEV_SERVER_ID)
              .commands(command.id)
              .delete();
          }
        });
      })
      .then(() => {
        client.commands.forEach((element) => {
          client.api
            .applications(client.user.id)
            .guilds(process.env.DEV_SERVER_ID)
            .commands.post({
              data: {
                name: element.name,
                description: element.description,
                options: element.options,
              },
            });
        });
      });
  } else {
    // Add Slash Commands Globally
    client.api
      .applications(client.user.id)
      .commands.get()
      .then((commands) => {
        commands.forEach((command) => {
          if (!client.commands.has(command.name)) {
            client.api
              .applications(client.user.id)
              .commands(command.id)
              .delete();
          }
        });
      })
      .then(() => {
        client.commands.forEach((element) => {
          client.api.applications(client.user.id).commands.post({
            data: {
              name: element.name,
              description: element.description,
              options: element.options,
            },
          });
        });
      });
  }
  console.log('Ready! Now using slash commands!');
});

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const commandName = interaction.data.name.toLowerCase();
  const args = interaction.data.options;

  // Find command js file
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  // Execute command
  const response = await command.execute(
    args,
    interaction.member,
    interaction,
    client
  );

  client.api
    .interactions(interaction.id, interaction.token)
    .callback.post(response)
    .catch((err) => console.log(`NEW ERROR ON CALLBACK POST: ${err}`));
});

client.on('message', (message) => {
  if (message.author.bot) return null;
  if (message.channel.type === 'dm') {
    message.reply(
      'Hello! Although I do not log messages sent to me, be sure not to store images or text such as password here. Thank you!'
    );
  }
  if (
    (message.content.trimStart().startsWith(`@${client.user.username}`) ||
      message.mentions.users.has(client.user.id)) &&
    !message.author.bot
  ) {
    return message.reply(
      'I now use slash commands! Start typing `/`, and you will see a list with all my commands. If you have any problems, make sure to update your discord version.'
    );
  }
  return null;
});

client.login(process.env.TOKEN);
