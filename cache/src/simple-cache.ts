export interface Cacheble {
  key: string
  expireInMs: number
}

export class SimpleCache<T extends Cacheble> {
  private cache: Record<string, T>

  constructor() {
    this.cache = {}
  }

  set(item: T): void {
    this.cache[item.key] = item
  }

  get(key: string): T {
    return this.cache[key] ?? null
  }

  isExpired(key: string, timeInMs: number): boolean {
    const item = this.get(key)
    if (!item) return false
    return item.expireInMs < timeInMs
  }

  clear(): void {
    this.cache = {}
  }
}
