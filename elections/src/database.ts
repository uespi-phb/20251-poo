export interface Database {
  connect(): void
  disconnect(): void

  isConnected(): boolean

  queryNone(sql: string, params?: unknown[]): void
  queryAny<T = unknown>(sql: string, params?: unknown[]): T[]

  transaction(callback: TransactionCallback): void
}

export type TransactionCallback = () => void
