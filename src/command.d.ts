import {
  CommandInteractionOptionResolver,
  APIInteractionGuildMember,
  GuildMember,
  CommandInteraction,
  Client,
  ApplicationCommandOptionData,
} from 'discord.js';

export interface Commands {
  [key: string]: Command;
}
export default interface Command {
  name: string;
  description: string;
  options?: ApplicationCommandOptionData[];
  execute: (
    interaction: CommandInteraction,
    args: CommandInteractionOptionResolver,
    author: GuildMember | APIInteractionGuildMember | null,
    commands: Commands,
    client: Client
  ) => void;
}
