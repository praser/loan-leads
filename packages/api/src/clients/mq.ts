import amqplib from 'amqplib'

const open = amqplib.connect(process.env.AMQP_URL || '')

export enum EnumMQActions {
  'CREATE',
  'UPDATE',
}

export interface IMQMessage<T> {
  action: EnumMQActions
  message: T
}

export const publish = async <T>(
  queue: string,
  message: IMQMessage<T>,
): Promise<boolean> => {
  try {
    const conn = await open
    const channel = await conn.createChannel()
    await channel.assertQueue(queue)
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export default publish
