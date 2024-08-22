import { ReactNode, CSSProperties, Dispatch, SetStateAction } from 'react';

export type UserType = {
  name: string;
  bio: string;
  nameIcons?: Array<ReactNode>;
  bioIcons?: Array<ReactNode>;
  photoUrl?: string;
  lastMessage?: string;
  style?: CSSProperties;
  onClick?: (e: any) => void;
};

export type MessageTypes = 'TEXT' | 'VIDEO' | 'IMAGE';

export type ConversationType = {
  id: number;
  type: MessageTypes;
  content: string;
  createdAt?: Date;
  photoUrl?: string;
  mediaUrl?: string;
  position: 'RIGHT' | 'LEFT';
};

export type State = {
  activeUser?: UserType;
  isListOpen?: boolean;
  isInfoOpen?: boolean;
};

export type SetState = Dispatch<SetStateAction<State>>;

export type Position = 'LEFT' | 'RIGHT';

export type ChatProps = {
  conversations: Array<ConversationType>;
  list: Array<UserType>;
  currentUser: UserType;
  state: State;
  setState: SetState;
  height?: number | string;
  onNewMessage?: (message: string) => void;
  fetchNextConversations?: () => void;
  fetchNextContacts?: () => void;
  readOnly?: boolean;
  listPosition?: Position;
};
