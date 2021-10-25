import faker from 'faker'
import { EnumMQActions, ILead, IMQMessage } from '@loan-leads/core'

import { generateMessage } from './generateMessage'

describe('generateMessage', () => {
  let sut: IMQMessage<ILead>, action: EnumMQActions, content: ILead

  beforeEach(() => {
    action = EnumMQActions.CREATE
    content = { id: faker.datatype.uuid() }
    sut = generateMessage(action, content)
  })

  it('is expect to correctly map action', () => {
    expect(sut.action).toBe(action)
  })

  it('is expect to correctly map content', () => {
    expect(sut.content).toBe(content)
  })
})
