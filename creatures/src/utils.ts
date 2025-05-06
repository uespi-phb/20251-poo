
export function random(n: number): number {
  return Math.floor(Math.random() * n)
}

export function randomChoice<T>(array:T[], count: number): T[] {
  const choice: T[] = []

  if (count > array.length) throw new Error(`Invalid count: ${count}`)

  do {
    const pickedElem = array[random(array.length)]
    if (choice.indexOf(pickedElem) == -1) {
      choice.push(pickedElem)
    }
  } while(choice.length < count)

  return choice
}