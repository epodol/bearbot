import Discord from 'discord.js';
import Command from '../command';

const rps: Command = {
  name: 'rps',
  description: 'Plays rock paper scissors.',
  options: [
    {
      name: 'choice',
      description: 'Rock, Paper, or Scissors',
      type: 'STRING',
      required: true,
      choices: [
        {
          name: 'Rock',
          value: 'rock',
        },
        {
          name: 'Paper',
          value: 'paper',
        },
        {
          name: 'Scissors',
          value: 'scissors',
        },
      ],
    },
  ],
  execute(interaction, args, author, commands, client) {
    const choice = args.getString('choice');
    let result: any = {};
    if (choice === 'rock') {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          result = { uc: 'Rock', cc: 'Rock', r: 1 };
          break;
        case 1:
          result = { uc: 'Rock', cc: 'Paper', r: 2 };
          break;
        case 2:
          result = { uc: 'Rock', cc: 'Scissors', r: 0 };
          break;
      }
    }
    if (choice === 'paper') {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          result = { uc: 'Paper', cc: 'Rock', r: 0 };
          break;
        case 1:
          result = { uc: 'Paper', cc: 'Paper', r: 1 };
          break;
        case 2:
          result = { uc: 'Paper', cc: 'Scissors', r: 2 };
          break;
      }
    }
    if (choice === 'scissors') {
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          result = { uc: 'Scissors', cc: 'Rock', r: 2 };
          break;
        case 1:
          result = { uc: 'Scissors', cc: 'Paper', r: 0 };
          break;
        case 2:
          result = { uc: 'Scissors', cc: 'Scissors', r: 1 };
          break;
      }
    }

    let color = '';
    let resultString = '';
    switch (result.r) {
      case 0:
        color = '#00FF00';
        resultString = 'You **Won**!';
        break;
      case 1:
        color = '#FFA500';
        resultString = "It's a **tie**!";
        break;
      case 2:
        color = '#FF0000';
        resultString = 'You **Lose**!';
        break;
      default:
        throw new Error(`Unexpected result: ${result.r}`);
    }

    const resultEmbed = new Discord.MessageEmbed()
      .setColor(color as any)
      .setTitle('Rock Paper Scissors!')
      .setDescription(resultString)
      .addFields(
        { name: 'You Chose:', value: result.uc, inline: true },
        { name: 'I Chose:', value: result.cc, inline: true }
      )
      .setTimestamp();

    interaction.reply({
      embeds: [resultEmbed],
    });
  },
};

export default rps;
