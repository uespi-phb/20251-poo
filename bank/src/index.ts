import { Account } from './account'

const a1 = new Account(12345, 23, 'FULANO DE CASTRO')
const a2 = new Account(98765, 23, 'BELTRANO DA SILVA')
const a3 = new Account(82366, 23, 'CICRANO OLIVEIRA')

a1.deposit(1000.00)
a1.withdraw(200.00)
a1.transfer(300.00, a2)

a1.showBalance()
a2.showBalance()
