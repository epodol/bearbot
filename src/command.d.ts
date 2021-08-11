import {
  CommandInteractionOptionResolver,
  APIInteractionGuildMember,
  GuildMember,
  CommandInteraction,
  Client,
  ApplicationCommandOptionData,
} from 'discord.js';

export default interface Command {
  name: string;
  description: string;
  options?: ApplicationCommandOptionData[];
  execute: (
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver,
    author: GuildMember | APIInteractionGuildMember | null,
    commands: any,
    client: Client
  ) => void;
}
