import { EnumMQActions, IMQMessage, IConsumer, ILead } from '@loan-leads/core'
import { create } from './dao'

export const consumer: IConsumer<ILead> = {
  consume: (message: IMQMessage<ILead>): void => {
    const { action, content } = message

    switch (action) {
      case EnumMQActions.CREATE:
        create(content)
        break
      default:
        break
    }
  },
}
