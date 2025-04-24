import { Account } from './account'
import { Bank } from './bank'
import { SpecialAccount } from './special-account'

console.log('*** BEGIN')

const bank = Bank.load()

// const bank = new Bank(999, 'BANCO EXEMPLO S/A')

// bank.addAccount(new Account(987, 12345, 'FULANO DE CASTRO'))
// bank.addAccount(new Account(123, 98765, 'BELTRANO DA SILVA'))
// bank.addAccount(new SpecialAccount(123, 76340, 'CICRANO DE OLIVEIRA', 1000.0))

bank.showAccounts()

bank.save()
