import dotenv from 'dotenv-safe'
dotenv.config()

import 'reflect-metadata'
import { createConnection, getConnection } from 'typeorm'
import { Lead } from './entity/Lead'
import { getConfig } from '../ormconfig'

export { createConnection, getConfig, getConnection, Lead }
