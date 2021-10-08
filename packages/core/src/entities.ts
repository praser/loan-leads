import { EnumNecessity } from './enums'

export interface ILead {
  age?: number
  id: string
  name?: string
  necessity?: EnumNecessity
}
