export interface ExerciseAction {
  start(): string
}

export abstract class Exercise implements ExerciseAction {
  public readonly steps: string[]
  public readonly name: string
  public readonly durationInMin: number

  constructor(name: string, durationInMin: number) {
    this.name = name
    this.durationInMin = durationInMin
    this.steps = []
  }

  addStep(step: string): void {
    this.steps.push(step)
  }

  start(): string {
    const stepsText = this.steps.join('\n')
    return `${this.name} (${this.durationInMin} min):\n${stepsText}\n`
  }
}

export class Yoga extends Exercise {
  public readonly warmingUpInMin: number

  constructor(name: string, durationInMin: number, warmingUpInMin: number) {
    super(name, durationInMin)
    this.warmingUpInMin = warmingUpInMin
  }
}

export class Running extends Exercise {
  public readonly distanceInMeters: number

  constructor(name: string, durationInMin: number, distanteInMeter: number) {
    super(name, durationInMin)
    this.distanceInMeters = distanteInMeter
  }
}

export class Training<T extends ExerciseAction> {
  public readonly name: string
  private readonly exercises: T[]

  constructor(name: string) {
    this.name = name
    this.exercises = []
  }

  addExercise(exercise: T): void {
    this.exercises.push(exercise)
  }

  execute(): string {
    let routine: string

    routine = ''
    for (const exercise of this.exercises) {
      routine += exercise.start()
    }

    return routine
  }
}
