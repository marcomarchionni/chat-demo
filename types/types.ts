import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Firestore } from "firebase/firestore";

export type StackParamList = {
  Start: undefined;
  Chat: { name: string; theme: Theme, userID: string };
};

export interface Theme {
  background: string,
  bubbleLeft: string,
  bubbleRight: string
}

export type ChatProps = {
  navigation: NativeStackNavigationProp<StackParamList, "Chat", undefined>;
  route: RouteProp<StackParamList, "Chat">;
  db: Firestore;
  isConnected: boolean | null;
}

export type StartProps = NativeStackScreenProps<StackParamList, 'Start'>;
