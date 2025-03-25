import { Account } from './account'
import { Bank } from './bank'


const bank = new Bank(999, 'BANCO EXEMPLO S/A')

bank.createAccount(12345, 987, 'FULANO DE CASTRO')
bank.createAccount(98765, 123, 'BELTRANO DA SILVA')
bank.createAccount(82366, 333, 'CICRANO OLIVEIRA')

bank.showAccounts()
