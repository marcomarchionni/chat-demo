import { DocumentData } from 'firebase/firestore';
import { IMessage } from 'react-native-gifted-chat';
import { ChatMessage } from '../types/types';

export const mapDataToMessage = (id: string, data: DocumentData) => {
  const message: ChatMessage = {
    _id: id, // Use the document ID as the message ID
    text: data.text,
    createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date
    user: data.user,
    image: data.image && data.image,
    video: data.video && data.video,
    audio: data.audio && data.audio,
    system: data.system && data.system,
    sent: data.sent && data.sent,
    received: data.received && data.received,
    pending: data.pending && data.pending,
    quickReplies: data.quickReplies && data.quickReplies,
    location: data.location && data.location,
  };
  return message;
};

export const isArrayOfChatMessage = (
  value: unknown,
): value is ChatMessage[] => {
  const isArray = Array.isArray(value);
  const LengthMoreThanZero = isArray && value.length > 0;
  const isArrayOfMessages = isArray && value.every(isChatMessage);
  console.log({ isArray, LengthMoreThanZero, isArrayOfMessages });
  return LengthMoreThanZero && isArrayOfMessages;
};

export const isChatMessage = (value: unknown): value is ChatMessage => {
  return (
    Object.prototype.hasOwnProperty.call(value, '_id') &&
    Object.prototype.hasOwnProperty.call(value, 'createdAt') &&
    Object.prototype.hasOwnProperty.call(value, 'user')
  );
};
