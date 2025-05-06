
export abstract class Creature {
  public readonly name: string
  protected health: number
  protected attackPower: number

  constructor(name: string, health: number, attackPower: number) {
    this.name = name
    this.health = health
    this.attackPower = attackPower
  }

  abstract move(): string

  isAlive(): boolean {
    return this.health > 0
  }

  defend(amount: number): void {
    this.health -= amount
  }

  attack(target: Creature): string {
    target.defend(this.attackPower)
    return `${this.name} attacked ${target.name} for ${this.attackPower} damage.` +
           `${target.name} health is now ${target.health}.`
  }
}

export class Dragon extends Creature {
  private static initialHealth = 300
  private static initialPowerAttack = 50

  constructor(name: string) {
    super(name, Dragon.initialHealth, Dragon.initialPowerAttack)
  }

   move(): string {
    return 'soars through the skies'
   }
}

export class Elf extends Creature {
  private static initialHealth = 100
  private static initialPowerAttack = 30

  constructor(name: string) {
    super(name, Elf.initialHealth, Elf.initialPowerAttack)
  }

   move(): string {
    return 'glides through the forest'
   }
}

export class Troll extends Creature {
  private static initialHealth = 200
  private static initialPowerAttack = 40

  constructor(name: string) {
    super(name, Troll.initialHealth, Troll.initialPowerAttack)
  }

   move(): string {
    return 'charges with heavy steps'
   }
}

