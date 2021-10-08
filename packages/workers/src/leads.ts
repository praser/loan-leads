import dotenv from 'dotenv-safe'

import { ILead } from '@loan-leads/core'
import { createConnection, getConfig, getConnection, Lead } from '@loan-leads/database'
import { ConsumeMessage } from 'amqplib'
import { consume } from './clients/mq'

dotenv.config()

const queue = 'leads'
const config = getConfig(process.env)

const successHandler = (lead: ILead) => console.log(`The lead ${lead.id} was successfuly persisted.`)

const errorHander = (lead: ILead, err: unknown) => {
  console.error(`The lead ${lead.id} was not persisted.`)
  console.error(err)
}

const createLead = async (params: ILead) => {
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

const consumer = async (message: ConsumeMessage) => {
  const params: ILead = JSON.parse(message.content.toString())
  createLead(params)
}

;(async () => {
  await createConnection(config)
  consume(queue, consumer)
})()
