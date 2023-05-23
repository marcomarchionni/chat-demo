import { DocumentData } from 'firebase/firestore';
import { IMessage } from 'react-native-gifted-chat';

export const mapToMessage = (id: string, data: DocumentData) => {
  const message: IMessage = {
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
  };
  return message;
};

export const isArrayOfIMessage = (value: unknown): value is IMessage[] => {
  return Array.isArray(value) && value.length > 0 && value.every(isIMessage);
};

export const isIMessage = (value: unknown): value is IMessage => {
  return (
    Object.prototype.hasOwnProperty.call(value, '_id') &&
    Object.prototype.hasOwnProperty.call(value, 'text') &&
    Object.prototype.hasOwnProperty.call(value, 'createdAt') &&
    Object.prototype.hasOwnProperty.call(value, 'user')
  );
};
