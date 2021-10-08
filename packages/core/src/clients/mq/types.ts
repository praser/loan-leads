export enum EnumMQActions {
  'CREATE',
  'UPDATE',
}

export interface IMQMessage<T> {
  action: EnumMQActions
  content: T
}

export interface IConsumer<T> {
  consume: (message: IMQMessage<T>) => void
}
