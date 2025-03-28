import { Bank } from './bank'

console.log('** BEGIN **')

const bank = new Bank(999, 'BANCO EXEMPLO S/A')

bank.createAccount(987, 12345, 'FULANO DE CASTRO')
bank.createAccount(123, 98765, 'BELTRANO DA SILVA')
bank.createAccount(333, 82366, 'CICRANO OLIVEIRA')

bank.showAccounts()

const ac1 = bank.getAccount(987, 12345)
const ac2 = bank.getAccount(12399, 98765)
const ac3 = bank.getAccount(333, 82366)

ac1?.showBalance()
ac1?.deposit(123456789.76)
ac1?.withdraw(500.0)
ac1?.showBalance()

if (ac2 != undefined) {
  ac1?.transfer(200.0, ac2)
}
ac1?.showBalance()
ac2?.showBalance()

console.log('** END **')
