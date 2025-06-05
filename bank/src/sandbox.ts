function sample(...items: number[]): void {
  console.log(typeof items, '>>', items)
}

sample(1, 2, 3, 4)
sample(...[1, 2, 3, 4])
