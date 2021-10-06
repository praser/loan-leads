import { Column, Entity, PrimaryColumn } from 'typeorm'
import { EnumNecessity, ILead } from '@financiamento-bancario/core'

@Entity()
export class Lead implements ILead {
  @Column()
  age?: number

  @PrimaryColumn()
  id: string

  @Column()
  name?: string

  necessity?: EnumNecessity
}
