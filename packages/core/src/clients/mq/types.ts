export enum EnumMQActions {
  'CREATE',
  'UPDATE',
}

export interface IMQMessage<T> {
  action: EnumMQActions
  message: T
}

export interface IConsumer {
  consume: <T>(message: IMQMessage<T>) => void
}
