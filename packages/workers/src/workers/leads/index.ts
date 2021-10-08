import '../../config'
import { createConnection, getConfig } from '@loan-leads/database'
import { consume } from '@loan-leads/utils/'
import { consumer } from './consumer'

const queue = 'leads'
const config = getConfig(process.env)

;(async () => {
  await createConnection(config)
  consume(queue, consumer)
  console.log(`Leads worker is up and listening to ${queue} queue.`)
})()
