import { Bank } from './bank'

console.log('** BEGIN **')

const bank = new Bank(999, 'BANCO EXEMPLO S/A')

const ac1 = bank.createAccount(987, 12345, 'FULANO DE CASTRO')
const ac2 = bank.createAccount(123, 98765, 'BELTRANO DA SILVA')

// bank.showAccounts()

// ac1.showBalance()
ac1.deposit(1500.0)
ac1.withdraw(500.0)
ac1.transfer(300.0, ac2)

ac1.showStatement()

console.log('** END **')
