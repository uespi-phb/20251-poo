export interface Comparable<T> {
  compare(other: T): number
}

export class Queue<T extends Comparable<T>> {
  private readonly size: number
  private readonly data: T[]

  constructor(size: number) {
    this.size = size
    this.data = []
  }

  enqueue(elem: T): void {
    if (this.data.length === this.size) throw new Error('Queue is full')
    this.data.push(elem)
  }

  dequeue(): T {
    if (this.data.length === 0) throw new Error('Queue is empty')
    const elem = this.data[0]
    for (let i = 0; i < this.data.length - 1; i++) {
      this.data[i] = this.data[i + 1]
    }
    this.data.length = this.data.length - 1
    return elem
  }

  sort(): void {
    this.data.sort((e1, e2) => e1.compare(e2))
  }

  show(): void {
    for (const elem of this.data) {
      console.log(elem)
    }
    console.log('-----')
  }
}
