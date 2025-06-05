export interface Database {
  connect(): void
  disconnect(): void

  isConnected(): boolean

  queryNone(sql: string, params?: unknown[]): void
  queryAny(sql: string, params?: unknown[]): unknown[]
}
