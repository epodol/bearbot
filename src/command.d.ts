import {
  CommandInteractionOptionResolver,
  GuildMember,
  CommandInteraction,
  Client,
  ApplicationCommandOptionData,
} from 'discord.js';
import { APIInteractionGuildMember } from 'discord-api-types/v9';

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
