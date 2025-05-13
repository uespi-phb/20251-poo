import { Animal } from './animal'
import { BreedSize } from './size'

export enum CatBreed {
  singapura,
  somali,
  siamese,
  ragdoll,
  siberian,
}

export class Cat extends Animal {
  public readonly breed: CatBreed

  constructor(name: string, breed: CatBreed) {
    super(name, Cat.breedSize(breed))
    this.breed = breed
  }

  static breedSize(breed: CatBreed): BreedSize {
    switch (breed) {
      case CatBreed.singapura:
        return BreedSize.tiny
      case CatBreed.somali:
        return BreedSize.small
      case CatBreed.siamese:
        return BreedSize.small
      case CatBreed.ragdoll:
        return BreedSize.average
      case CatBreed.siberian:
        return BreedSize.huge
    }
  }

  speciesName(): string {
    return 'cat'
  }

  breedName(): string {
    return CatBreed[this.breed]
  }
}
