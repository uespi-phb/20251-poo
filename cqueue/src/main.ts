import { Comparable, Queue } from './queue'

class User implements Comparable<User> {
  constructor(
    public readonly id: number,
    public readonly name: string
  ) {}

  compare(other: User): number {
    return this.name < other.name ? -1 : this.name > other.name ? 1 : 0
  }
}

const q = new Queue<User>(5)

q.enqueue(new User(10, 'Maria'))

q.enqueue(new User(17, 'Wesley'))

q.enqueue(new User(4, 'Fulano'))

q.enqueue(new User(3, 'Zildamara'))

q.show()
q.sort()
q.show()
