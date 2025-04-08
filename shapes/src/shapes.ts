abstract class Shape {
  public readonly id: string

  constructor(id: string) {
    this.id = id
  }

  protected abstract validate(): void
  public abstract area(): number
  public abstract perimeter(): number
}

abstract class EdgeShape extends Shape {
  public readonly edges: number[]

  constructor(id: string, edges: number[]) {
    super(id)
    this.edges = [...edges]
    this.validate()
  }

  protected validate(): void {
    for (const edge of this.edges) {
      if (edge <= 0) throw new Error('Shape sides must be positive value')
    }
  }

  perimeter(): number {
    let sum = 0
    for (let edge of this.edges) {
      sum += edge
    }
    return sum
  }
}

abstract class NoEdgeShape extends Shape {}

class Triangle extends EdgeShape {
  constructor(id: string, edge1: number, edge2: number, edge3: number) {
    super(id, [edge1, edge2, edge3])
    this.validate()
  }

  protected validate(): void {
    const s1 = this.edges[0]
    const s2 = this.edges[1]
    const s3 = this.edges[2]

    super.validate()

    if (!(s1 + s2 > s3 && s1 + s3 > s2 && s2 + s3 > s1))
      throw new Error('Invalid triangle edges')
  }

  area(): number {
    const s = this.perimeter() / 2
    const e1 = this.edges[0]
    const e2 = this.edges[1]
    const e3 = this.edges[2]

    return Math.sqrt(s * (s - e1) * (s - e2) * (s - e3))
  }
}

class Rect extends EdgeShape {
  constructor(id: string, width: number, height: number) {
    super(id, [width, height, width, height])
    this.validate()
  }

  area(): number {
    return this.edges[0] * this.edges[1]
  }
}

class Square extends Rect {
  constructor(id: string, edge: number) {
    super(id, edge, edge)
    this.validate()
  }
}

class Circle extends NoEdgeShape {
  public readonly radius: number

  constructor(id: string, r: number) {
    super(id)
    this.radius = r
  }

  protected validate(): void {
    if (this.radius <= 0)
      throw new Error('Circle raidius must be positive value')
  }

  area(): number {
    return Math.PI * this.radius ** 2
  }

  perimeter(): number {
    return Math.PI * 2 * this.radius
  }
}

const shapes: Shape[] = [
  new Triangle('t1', 3, 4, 5),
  new Rect('r1', 5, 10),
  new Square('s1', 8),
  new Circle('c1', 6),
]

console.log(shapes)
