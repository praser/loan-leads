import { ConnectionOptions } from 'typeorm'
import { join } from 'path'

const getConfig = (props): ConnectionOptions => {
  const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = props
  return {
    name: 'default',
    type: 'postgres',
    host: DB_HOST,
    port: parseInt(DB_PORT || '5432', 10),
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    synchronize: false,
    logging: false,
    entities: [join(__dirname, 'src/entity/**/*.js')],
    migrations: [join(__dirname, 'src/migration/**/*.js')],
    subscribers: [join(__dirname, 'src/subscriber/**/*.js')],
    cli: {
      entitiesDir: join(__dirname, 'src/entity'),
      migrationsDir: join(__dirname, 'src/migration'),
      subscribersDir: join(__dirname, 'src/subscriber'),
    },
  }
}

const config: ConnectionOptions = getConfig(process.env)

export { config as default, getConfig }
