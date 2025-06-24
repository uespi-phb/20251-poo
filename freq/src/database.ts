import fs from 'fs'

import BetterSqlite3, { Database as SQLiteDatabase } from 'better-sqlite3'

export class Database {
  private static connection?: SQLiteDatabase

  private static get db(): SQLiteDatabase {
    if (!this.connection) throw new Error('Database connection not established')
    return this.connection
  }

  static connect(dbFilename: string): void {
    if (this.connection) return

    if (!fs.existsSync(dbFilename)) throw new Error(`Database file not found: ${dbFilename}`)

    this.connection = new BetterSqlite3(dbFilename)
  }

  static disconnect(): void {
    this.db.close()
    this.connection = undefined
  }

  static isConnected(): boolean {
    return this.connection !== undefined
  }

  static queryNone(sql: string, params: unknown[] = []): void {
    this.db.prepare(sql).run(...params)
  }

  static queryOne<T = unknown>(sql: string, params: unknown[] = []): T | undefined {
    return this.db.prepare(sql).get(...params) as T
  }

  static queryMany<T = unknown>(sql: string, params: unknown[] = []): T[] {
    return this.db.prepare(sql).all(...params) as T[]
  }
}
