import { Animal } from './animal'
import { BreedSize } from './size'

export enum BirdBreed {
  verdin,
  robin,
  pigeon,
  peacock,
  emu,
}

export class Bird extends Animal {
  public readonly breed: BirdBreed

  constructor(name: string, breed: BirdBreed) {
    super(name, Bird.breedSize(breed))
    this.breed = breed
  }

  static breedSize(breed: BirdBreed): BreedSize {
    switch (breed) {
      case BirdBreed.verdin:
        return BreedSize.tiny
      case BirdBreed.robin:
        return BreedSize.small
      case BirdBreed.pigeon:
        return BreedSize.small
      case BirdBreed.peacock:
        return BreedSize.average
      case BirdBreed.emu:
        return BreedSize.huge
    }
  }

  speciesName(): string {
    return 'bird'
  }

  breedName(): string {
    return BirdBreed[this.breed]
  }
}
