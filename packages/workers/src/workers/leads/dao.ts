import { ILead } from '@loan-leads/core'
import { getConnection, Lead } from '@loan-leads/database'

export const create = async (params: ILead): Promise<boolean> => {
  const lead = new Lead()
  lead.id = params.id
  const conn = getConnection()

  try {
    await conn.manager.save(lead)
    console.log(`The lead ${lead.id} was successfuly creted.`)
    return true
  } catch (err) {
    console.error(`The lead ${lead.id} was not created.`)
  }

  return false
}
