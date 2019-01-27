import {Message} from './message.model';

export class ChatChannel {
  uniqueName: string;
  username: string;
  image: string;
  messages: Message[];
}
