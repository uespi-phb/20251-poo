export interface Cacheble {
  key(): string
}

type CachedItem<T> = {
  timeToLive: number
  item: T
}

export class SimpleCache<T extends Cacheble> {
  private readonly cache: Record<string, CachedItem<T>>
  public readonly defaultTimeToLiveInMs: number

  constructor(defaultTimeToLiveInMs?: number) {
    this.cache = {}

    const defaultCacheTimeToLive = 1000
    this.defaultTimeToLiveInMs = defaultTimeToLiveInMs ?? defaultCacheTimeToLive
  }

  private getItem(key: string): CachedItem<T> {
    const chachedItem = this.cache[key]
    if (!chachedItem) throw new Error(`Invalid chached item key: ${key}`)
    return chachedItem
  }

  isExpired(key: string, expiringTimeInMs: number): boolean {
    const chachedItem = this.getItem(key)
    return expiringTimeInMs > chachedItem.timeToLive
  }

  get(key: string): T {
    return this.getItem(key).item
  }

  set(item: T, timeToLiveInMs?: number): void {
    const key = item.key()
    this.cache[key] = {
      timeToLive: timeToLiveInMs ?? this.defaultTimeToLiveInMs,
      item: item,
    }
  }

  getCache(): Record<string, CachedItem<T>> {
    return this.cache
  }
}
