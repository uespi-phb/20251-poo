import { Animal } from './animal'
import { Bird, BirdBreed } from './bird'
import { Cat, CatBreed } from './cat'
import { Dog, DogBreed } from './dog'
import { randomChoice } from './utils'
import { Motobike, Scooter, Vehicle, Wagon } from './vehicle'

const vehicles: Vehicle[] = [
  new Scooter('Scooter #1'),
  new Scooter('Scooter #2'),
  new Motobike('Motobike #1'),
  new Motobike('Motobike #2'),
  new Motobike('Motobike #3'),
  new Wagon('Wagon #1'),
]

const animals: Animal[] = [
  new Dog('Rex', DogBreed.pitbul),
  new Dog('Totó', DogBreed.chihuahua),
  new Dog('Bono', DogBreed.germanShepper),
  new Cat('Antônio', CatBreed.siberian),
  new Cat('Paulo Freire', CatBreed.singapura),
  new Cat('Aparecida', CatBreed.somali),
  new Bird('Sebastião', BirdBreed.pigeon),
  new Bird('Pernalonga', BirdBreed.emu),
]

export function randomTransport(vehicles: Vehicle[], animals: Animal[]): void {
  console.log('## RANDOM TRANSPORT ##')
  for (const animal of animals) {
    const vehicle = randomChoice(vehicles)

    console.log(`Transporting ${animal.name} (${animal.speciesName()}, ${animal.breedName()})`)
    if (animal.size <= vehicle.maxBreedSize) {
      console.log(`> ${animal.name} transported successfully by vehicle ${vehicle.name}\n`)
    } else {
      console.log(`X ${animal.name} could not be transported by vehicle ${vehicle.name}\n`)
    }
  }
}

function chooseBestVehicle(vehicles: Vehicle[], animal: Animal): Vehicle | undefined {
  let bestVehicle: Vehicle | undefined = undefined
  let bestEmptySize: number | undefined = undefined
  for (const vehicle of vehicles) {
    const emptySize = vehicle.maxBreedSize - animal.size
    const minEmptySize = bestEmptySize ?? emptySize
    if (emptySize <= minEmptySize && animal.size <= vehicle.maxBreedSize) {
      bestEmptySize = emptySize
      bestVehicle = vehicle
    }
  }
  return bestVehicle
}

export function bestTransport(vehicles: Vehicle[], animals: Animal[]): void {
  console.log('## BEST TRANSPORT ##')
  for (const animal of animals) {
    const vehicle = chooseBestVehicle(vehicles, animal)
    console.log(`Transporting ${animal.name} (${animal.speciesName()}, ${animal.breedName()})`)
    if (vehicle) {
      console.log(`> The best vehicle to transport ${animal.name} is ${vehicle.name}\n`)
    } else {
      console.log(`X There is no suitable vehicle to transport ${animal.name}\n`)
    }
  }
}

bestTransport(vehicles, animals)
console.log('--------------')
randomTransport(vehicles, animals)
