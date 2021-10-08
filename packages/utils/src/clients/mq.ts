import amqplib, { Channel, ConsumeMessage } from 'amqplib'
import { EnumMQActions, IMQMessage, IConsumer } from '@loan-leads/core'

const connect = amqplib.connect(process.env.AMQP_URL || '')

const parseMessage = <T>(message: ConsumeMessage | null): IMQMessage<T> => {
  if (!message) throw new Error('Invalid message')
  return JSON.parse(message.content.toString())
}

const destroyMessage = (message: ConsumeMessage | null, channel: Channel): void => {
  if (!message) throw new Error('Invalid message')
  channel.ack(message)
}

const consume = async <T>(queue: string, consumer: IConsumer): Promise<void> => {
  const conn = await connect
  const channel = await conn.createChannel()
  await channel.assertQueue(queue)
  await channel.consume(queue, (onMessage): void => {
    const message = parseMessage<T>(onMessage)
    consumer.consume(message)
    destroyMessage(onMessage, channel)
  })
}

const publish = async <T>(queue: string, message: IMQMessage<T>): Promise<boolean> => {
  try {
    const conn = await connect
    const channel = await conn.createChannel()
    await channel.assertQueue(queue)
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export { consume, EnumMQActions, IConsumer, IMQMessage, publish }
