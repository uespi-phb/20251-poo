import { Bank } from './bank'
import { Database } from './database'

Database.connect()

const bankId = 1
const bank = Bank.load(bankId)

console.log(bank)

// bank.showAccounts()

// for (const account of bank.accounts) {
//   account.showStatement()
// }

// // bank.save()

Database.disconnect()
