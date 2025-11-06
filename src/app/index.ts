import 'dotenv/config';
import client from '@core/client';
import {
  voiceStateUpdate,
  guildMemberAdd,
  ready,
  interactionCreate,
} from '@events';

client.once('ready', ready);

client.on('guildMemberAdd', guildMemberAdd);
client.on('voiceStateUpdate', voiceStateUpdate);
client.on('interactionCreate', interactionCreate);

client.login(process.env.CLIENT_TOKEN);
