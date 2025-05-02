import { Bank } from './bank'

const bank = Bank.load()

bank.showAccounts()

for (const account of bank.accounts) {
  account.showStatement()
}

// bank.save()
