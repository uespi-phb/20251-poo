import { BreedSize } from './size'

export abstract class Vehicle {
  public readonly name: string
  public readonly maxBreedSize: BreedSize

  constructor(name: string, maxBreedSize: BreedSize) {
    this.name = name
    this.maxBreedSize = maxBreedSize
  }
}

export class Scooter extends Vehicle {
  constructor(name: string) {
    super(name, BreedSize.small)
  }
}

export class Motobike extends Vehicle {
  constructor(name: string) {
    super(name, BreedSize.average)
  }
}

export class Wagon extends Vehicle {
  constructor(name: string) {
    super(name, BreedSize.huge)
  }
}
