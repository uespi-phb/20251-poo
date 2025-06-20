import { Exercise, Running, Training, Yoga } from './exercise'

const moningYoga = new Yoga('Morning Yoga', 10, 3)
moningYoga.addStep('Sit and relax')
moningYoga.addStep('Close your eyes')
moningYoga.addStep('Meditate')

const relaxingYoga = new Yoga('Relaxing Yoga', 10, 0)
moningYoga.addStep('Sit and relax')
moningYoga.addStep('Close your eyes')
moningYoga.addStep('Meditate deeply')

const softRunning = new Running('Corrida Leve', 15, 3200)
const hardRnning = new Running('Corrida Pesada', 25, 5000)

const training = new Training<Exercise>('Standard Training')
training.addExercise(moningYoga)
training.addExercise(softRunning)
training.addExercise(hardRnning)
training.addExercise(relaxingYoga)

console.log(training.execute())
