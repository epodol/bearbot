import dotenv from 'dotenv';
import * as fs from 'fs';
import Discord, { ActivityType, ApplicationCommandData } from 'discord.js';
import Command, { Commands } from './command';

dotenv.config({ path: 'config' });

const client = new Discord.Client({
  presence: {
    activities: [
      {
        name: process.env.ACTIVITY_NAME || 'Bear Bot',
        type: (process.env.ACTIVITY_TYPE as ActivityType) || 'PLAYING',
      },
    ],
  },
  intents: [],
});

const commands: Commands = {};

if (process.env.BOT_COLOR === '') process.env.BOT_COLOR = '#0099ff';

client.once('ready', async () => {
  const files = fs.readdirSync(__dirname + '/commands');
  for (const file of files) {
    const command = require(`./commands/${file}`).default;
    commands[command.name] = command;
  }

  const newCommands: ApplicationCommandData[] = [];

  for (const command in commands) {
    newCommands.push({
      name: commands[command].name,
      description: commands[command].description,
      options: commands[command].options,
    });
  }

  if (
    process.env.DEV_SERVER_ID !== '' &&
    typeof process.env.DEV_SERVER_ID !== 'undefined'
  ) {
    // Add Slash Commands to Dev Server
    client.guilds.cache
      .get(process.env.DEV_SERVER_ID)
      ?.commands.set(newCommands)
      .catch(console.error);
  } else {
    // Add Slash Commands Globally
    client.application?.commands.set(newCommands).catch(console.error);
  }
  console.log('Ready! Now using slash commands!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  // Find command js file
  const command = commands[interaction.commandName.toLowerCase()] as Command;

  // Execute command
  command.execute(
    interaction,
    interaction.options,
    interaction.member,
    commands,
    client
  );
});

client.on('message', (message) => {
  if (client.user === null) return;
  if (message.author.bot) return;
  if (message.channel.type === 'DM') {
    message.reply(
      'Hello! Although I do not log messages sent to me, be sure not to store images or text such as passwords here. Thank you!'
    );
  }
  if (
    (message.content.trimStart().startsWith(`@${client.user.username}`) ||
      message.mentions.users.has(client.user.id)) &&
    !message.author.bot
  ) {
    message.reply(
      'I now use slash commands! Start typing `/`, and you will see a list with all my commands. If you have any problems, make sure to update your discord version.'
    );
  }
  return;
});

client.login(process.env.TOKEN).catch(console.error);
