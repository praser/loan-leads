import { EnumNecessity } from '../enums/EnumNecessity'

export interface ILead {
  age?: number
  id: string
  name?: string
  necessity?: EnumNecessity
}
