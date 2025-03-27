import { Bank } from './bank'


const bank = new Bank(999, 'BANCO EXEMPLO S/A')

bank.createAccount(987, 12345, 'FULANO DE CASTRO')
bank.createAccount(123, 98765, 'BELTRANO DA SILVA')
bank.createAccount(333, 82366, 'CICRANO OLIVEIRA')

bank.showAccounts()

const ac1 = bank.getAccount(333, 82366)
ac1?.showBalance()
