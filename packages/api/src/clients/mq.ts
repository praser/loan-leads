import amqplib from "amqplib"

const open = amqplib.connect(process.env.AMQP_URL || "")

export const publish = async (
  queue: string,
  message: any
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
