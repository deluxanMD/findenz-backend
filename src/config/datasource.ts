import { DataSource } from 'typeorm'

import { config } from '@/config'

// entities
import { Example } from '@/entities/example.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
  synchronize: config.nodeEnv === 'development',
  logging: false,
  entities: [Example],
  subscribers: [],
  migrations: ['src/migrations/**/*.ts'],
})

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize()
    console.log('✅ Database connection established successfully')
  } catch (error) {
    console.error('❌ Error connecting to database:', error)
    process.exit(1)
  }
}
