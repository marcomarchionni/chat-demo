import { RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { ActionsProps, IMessage } from 'react-native-gifted-chat';

export type StackParamList = {
  Start: undefined;
  Chat: { name: string; theme: Theme; userID: string };
};

export interface Theme {
  background: string;
  bubbleLeft: string;
  bubbleRight: string;
}

export type ChatProps = {
  navigation: NativeStackNavigationProp<StackParamList, 'Chat', undefined>;
  route: RouteProp<StackParamList, 'Chat'>;
  db: Firestore;
  storage: FirebaseStorage;
  isConnected: boolean | null;
};

export type StartProps = NativeStackScreenProps<StackParamList, 'Start'>;

export interface Location {
  latitude: number;
  longitude: number;
}

export interface ChatMessage extends IMessage {
  location?: Location;
}

export interface RenderCustomActionsProps extends ActionsProps {
  onSend: (data: { location?: Location; image?: string }) => void;
}

export interface CustomActionsProps extends RenderCustomActionsProps {
  storage: FirebaseStorage;
  userID: string;
}
