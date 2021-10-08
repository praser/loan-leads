import dotenv from 'dotenv-safe'

import { ILead } from '@loan-leads/core'
import { createConnection, getConfig, getConnection, Lead } from '@loan-leads/database'
import { ConsumeMessage } from 'amqplib'
import { consume, EnumMQActions, IMQMessage } from '../clients/mq'

dotenv.config()

const queue = 'leads'
const config = getConfig(process.env)

const successHandler = (lead: ILead) => console.log(`The lead ${lead.id} was successfuly persisted.`)

const errorHander = (lead: ILead, err: unknown) => {
  console.error(`The lead ${lead.id} was not persisted.`)
  console.error(err)
}

const create = async (params: ILead) => {
  const lead = new Lead()
  lead.id = params.id
  const conn = getConnection()

  try {
    await conn.manager.save(lead)
    successHandler(lead)
  } catch (err) {
    errorHander(lead, err)
  }
}

const consumer = async (consumeMessage: ConsumeMessage) => {
  const message: IMQMessage<ILead> = JSON.parse(consumeMessage.content.toString())
  switch (message.action) {
    case EnumMQActions.CREATE:
      create(message.message)
      break
    default:
      break
  }
}

;(async () => {
  await createConnection(config)
  consume(queue, consumer)
  console.log(`Leads worker is up and listening to ${queue} queue.`)
})()
