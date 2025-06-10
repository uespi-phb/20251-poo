import fs from 'fs'

import BetterSqlite3, { Database as BSQLiteDatabase } from 'better-sqlite3'

import { Database, TransactionCallback } from './database'

export class SQLiteDatabase implements Database {
  private readonly dbName: string
  private db?: BSQLiteDatabase

  constructor(dbName: string) {
    if (!fs.existsSync(dbName)) throw new Error('Database not exists')
    this.db = undefined
    this.dbName = dbName
  }

  isConnected(): boolean {
    return !!this.db
  }

  connect(): void {
    this.db = new BetterSqlite3(this.dbName)
  }

  disconnect(): void {
    this.db?.close()
    this.db = undefined
  }

  queryNone(sql: string, params?: unknown[]): void {
    const query = this.db?.prepare(sql)
    query?.run(params)
  }

  private assertConnection(): void {
    if (this.db === undefined) throw new Error('Not connected to dabatase')
  }

  queryAny<T = unknown>(sql: string, params?: unknown[]): T[] {
    this.assertConnection()
    const query = this.db!.prepare(sql)
    if (params) return query.all(...params) as T[]
    return query.all() as T[]
  }

  transaction(callback: TransactionCallback): void {
    this.assertConnection()
    const wrapped = this.db!.transaction(callback)
    try {
      wrapped()
    } catch {
      throw new Error('Error during transaction')
    }
  }
}
