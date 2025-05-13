import { BreedSize } from './size'

export abstract class Animal {
  public readonly name: string
  public readonly size: BreedSize

  constructor(name: string, size: BreedSize) {
    this.name = name
    this.size = size
  }

  abstract speciesName(): string
  abstract breedName(): string
}
