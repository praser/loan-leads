import amqplib from "amqplib"

const open = amqplib.connect(process.env.AMQP_URL || "")

export const consume = async (
  queue: string,
  consumer: (message: any) => void
) => {
  try {
    const conn = await open
    const channel = await conn.createChannel()
    await channel.assertQueue(queue)
    await channel.consume(queue, (message: any) => {
      if (!message) return
      consumer(message)
      channel.ack(message)
    })
  } catch (err) {
    console.error(err)
  }
}
