import { Creature } from './creatures'
import { randomChoice } from './utils'

export class BattleArena {
  private readonly creatures: Creature[] = []

  public addCreature(creature: Creature): void {
    this.creatures.push(creature)
  }

  private aliveCreatures(): number {
    let count = 0

    for (const creature of this.creatures) {
      if (creature.isAlive()) count++
    }

    return count
  }

  public startBattle(): string[] {
    const moves: string[] = []

    if (this.creatures.length < 2) throw new Error('Battle must have at leats 2 creatures')

    for (const creature of this.creatures) {
      const move = creature.move()
      moves.push(`${creature.name} moves: ${creature.name} ${move}.`)
    }

    let source: Creature
    let target: Creature
    do {
      const pickedCreatures = randomChoice(this.creatures, 2)
      source = pickedCreatures[0]
      target = pickedCreatures[1]

      moves.push(source.attack(target))

      if (target.isDead()) {
        const index = this.creatures.indexOf(target)
        this.creatures.splice(index, 1)
        moves.push(`${target.name} has fallen.`)
      }
    } while (this.aliveCreatures() > 1)

    moves.push(`${source.name} is the last creature standing!`)

    return moves
  }
}
