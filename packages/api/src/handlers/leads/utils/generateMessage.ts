import { ILead, EnumMQActions, IMQMessage } from '@loan-leads/core'

export const generateMessage = (
  action: EnumMQActions,
  content: ILead,
): IMQMessage<ILead> => ({ action, content })

export default generateMessage
