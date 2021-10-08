import dotenv from 'dotenv-safe'

import 'reflect-metadata'
import { createConnection, getConnection } from 'typeorm'
import { Lead } from './entity/Lead'
import { getConfig } from '../ormconfig'

dotenv.config()

export { createConnection, getConfig, getConnection, Lead }
