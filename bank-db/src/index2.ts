import { Bank } from './bank'
import { random, randomChoice, randomRange } from './utils'

const bank = Bank.load()

// const bank = new Bank(999, 'BANCO EXEMPLO S/A')

// bank.addAccount(new Account(987, 12345, 'FULANO DE CASTRO'))
// bank.addAccount(new Account(123, 98765, 'BELTRANO DA SILVA'))
// bank.addAccount(new SpecialAccount(123, 76340, 'CICRANO DE OLIVEIRA', 1000.0))

bank.showAccounts()

for (const account of bank.accounts) {
  let value: number

  value = randomRange(1000, 2000)
  account.deposit(value)

  const n = randomRange(3, 6)
  for (let k = 0; k < n; k++) {
    value = randomRange(100, 500)
    switch (random(3)) {
      case 0:
        account.deposit(value)
        break
      case 1:
        account.withdraw(value)
        break
      default:
        const otherAccount = randomChoice(bank.accounts)
        if (account !== otherAccount) {
          account.transfer(value, otherAccount)
        }
    }
  }

  account.showStatement()
}

bank.save()
