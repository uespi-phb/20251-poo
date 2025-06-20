import { Cacheble } from './simple-cache'

export class Product implements Cacheble {
  constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly unit: string,
    public readonly price: number
  ) {}

  key(): string {
    return this.id.toString()
  }
}
