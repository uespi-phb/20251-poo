import { Animal } from './animal'
import { BreedSize } from './size'

export enum DogBreed {
  pinscher,
  chihuahua,
  poodle,
  pitbul,
  germanShepper,
}

export class Dog extends Animal {
  public readonly breed: DogBreed

  constructor(name: string, breed: DogBreed) {
    super(name, Dog.breedSize(breed))
    this.breed = breed
  }

  static breedSize(breed: DogBreed): BreedSize {
    switch (breed) {
      case DogBreed.pinscher:
        return BreedSize.tiny
      case DogBreed.chihuahua:
      case DogBreed.poodle:
        return BreedSize.small
      case DogBreed.pitbul:
        return BreedSize.average
      case DogBreed.germanShepper:
        return BreedSize.huge
    }
  }

  speciesName(): string {
    return 'dog'
  }

  breedName(): string {
    return DogBreed[this.breed]
  }
}
