import { Product } from './product'
import { SimpleCache } from './simple-cache'
// import { Supplier } from './supplier'

const p1 = new Product(1015, 'Caneta Azul', 'und', 3.56)
const p2 = new Product(4322, 'Caderno 5 matérias', 'und', 13.96)
const p3 = new Product(2387, 'Papel A4', 'resma', 32.43)

const cacheProduct = new SimpleCache<Product>(500)
// const cacheSupplier = new SimpleCache<Supplier>()

cacheProduct.set(p1)
cacheProduct.set(p2, 500)
cacheProduct.set(p3, 1500)

console.log(cacheProduct.getCache())
