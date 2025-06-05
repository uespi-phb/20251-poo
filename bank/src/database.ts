import fs from 'fs'
import path from 'path'
import BetterSqlite3, { Database as SQLiteDatabase } from 'better-sqlite3'

export class Database {
  private static connection?: SQLiteDatabase

  private static get db(): SQLiteDatabase {
    if (!this.connection) throw new Error('Database connection not established')
    return this.connection
  }

  static connect(): void {
    if (this.connection) return

    const dbFilename = path.resolve(__dirname, '../bank.db')
    if (!fs.existsSync(dbFilename))
      throw new Error(`Database file not found: ${dbFilename}`)

    this.connection = new BetterSqlite3(dbFilename)
  }

  static disconnect(): void {
    this.db.close()
    this.connection = undefined
  }

  static queryNone(sql: string, params: unknown[] = []): void {
    this.db.prepare(sql).run(...params)
  }

  static queryOne<T>(sql: string, params: unknown[] = []): T | undefined {
    return this.db.prepare(sql).get(...params) as T
  }

  static queryMany<T>(sql: string, params: unknown[] = []): T[] {
    return this.db.prepare(sql).all(...params) as T[]
  }
}
