import { Cacheble, SimpleCache } from './simple-cache'

class User implements Cacheble {
  readonly key: string

  constructor(
    readonly id: string,
    readonly name: string,
    readonly role: number,
    public expireInMs: number
  ) {
    this.key = id
  }
}

const u1 = new User('1234', 'Maria', 0, 1000)
const u2 = new User('4321', 'João', 1, 2000)

const cache = new SimpleCache<User>()

cache.set(u1)
cache.set(u2)

console.log('u1 expired:', cache.isExpired(u1.key, 100))
console.log('u2 expired:', cache.isExpired(u1.key, 3000))
console.log('u2 expired:', cache.isExpired(u1.key, 3000))
