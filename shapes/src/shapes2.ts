/* Shape
 */
abstract class Shape {
  public readonly id: string
  public readonly type: string

  constructor(id: string, type: string) {
    this.id = id
    this.type = type
  }

  public abstract area(): number
  public abstract perimeter(): number

  //   public toString(): string {
  //     return `Shape(${this.id})`
  //   }

  protected validate(): void {
    const regex = /^[\w\d-]{2,}$/g
    if (!regex.test(this.id))
      throw `Invalid shape id. Shape id must formed by letters, numbers, '_' or '-': '${this.id}'`
  }
}

/* EdgeShape
 */
abstract class EdgeShape extends Shape {
  public readonly edges: number[]

  constructor(id: string, type: string, edges: number[]) {
    super(id, type)
    this.edges = [...edges]
    this.validate()
  }
  protected validate(): void {
    super.validate()
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

/* NoEdgeShape
 */
abstract class NoEdgeShape extends Shape {}

/* Triangle
 */
class Triangle extends EdgeShape {
  constructor(id: string, edge1: number, edge2: number, edge3: number) {
    super(id, 'Triangle', [edge1, edge2, edge3])
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

/* Rect
 */
class Rect extends EdgeShape {
  constructor(
    id: string,
    type: string | null = null,
    width: number,
    height: number
  ) {
    super(id, type ?? 'Rect', [width, height, width, height])
    this.validate()
  }

  area(): number {
    return this.edges[0] * this.edges[1]
  }
}

/* Square
 */
class Square extends Rect {
  constructor(id: string, edge: number) {
    super(id, 'Square', edge, edge)
    this.validate()
  }
}

/* Circle
 */
class Circle extends NoEdgeShape {
  public readonly radius: number

  constructor(id: string, radius: number) {
    super(id, 'Circle')
    this.radius = radius
  }

  protected validate(): void {
    super.validate()
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
  new Rect('r1', null, 10, 20),
  new Square('s1', 5),
  new Circle('c1', 4),
]

for (const shape of shapes) {
  const type = shape.type
  const perimeter = shape.perimeter().toFixed(1)
  const area = shape.area().toFixed(1)
  console.log(`${type}\t${shape}\tperimeter: ${perimeter}\tarea: ${area}`)
}
