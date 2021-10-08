import amqplib, { ConsumeMessage } from 'amqplib'

const open = amqplib.connect(process.env.AMQP_URL || '')

export enum EnumMQActions {
  'CREATE',
  'UPDATE',
}

export interface IMQMessage<T> {
  action: EnumMQActions
  message: T
}

export type Consumer = (message: ConsumeMessage) => void

export const consume = async (queue: string, consumer: Consumer): Promise<boolean> => {
  try {
    const conn = await open
    const channel = await conn.createChannel()
    await channel.assertQueue(queue)
    await channel.consume(queue, (message) => {
      if (!message) return false
      consumer(message)
      channel.ack(message)
      return true
    })
  } catch (err) {
    console.error(err)
  }
  return false
}

export default consume
