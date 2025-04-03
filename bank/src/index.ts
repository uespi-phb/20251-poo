import { Bank } from './bank'

console.log('** BEGIN **')

const bank = new Bank(999, 'BANCO EXEMPLO S/A')

const a1 = bank.createAccount(987, 12345, 'FULANO DE CASTRO')
const a2 = bank.createAccount(123, 98765, 'BELTRANO DA SILVA')
const s3 = bank.createAccount(123, 98765, 'BELTRANO DA SILVA', 1000.0)

// bank.showAccounts()

// ac1.showBalance()
a1.deposit(1500.0)
a1.withdraw(500.0)
a1.transfer(300.0, s3)

a1.showStatement()
s3.showStatement()

console.log('** END **')
