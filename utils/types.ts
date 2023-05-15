export type StackParamList = {
  Start: undefined;
  Chat: { name: string; theme: Theme };
};

export interface Theme {
  background: string,
  bubbleLeft: string,
  bubbleRight: string
}
