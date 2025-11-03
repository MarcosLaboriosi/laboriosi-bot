import { VoiceState } from '@types';
import { createPersonalVoiceChannel } from './createPersonalVoiceChannel';

export default async (oldState: VoiceState, newState: VoiceState) => {
  createPersonalVoiceChannel(oldState, newState);
};
