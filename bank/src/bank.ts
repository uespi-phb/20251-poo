import { Account } from './account'
import { SpecialAccount } from './special-account'
import { alignLine, alignText } from './utils'

export class Bank {
  public readonly id: number
  public readonly name: string
  public readonly accounts: Account[]

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
    this.accounts = []
  }

  createAccount(
    agency: number,
    id: number,
    accountHolder: string,
    limit?: number
  ): Account {
    let account: Account

    if (limit === undefined) {
      account = new Account(this, agency, id, accountHolder)
    } else {
      account = new SpecialAccount(this, agency, id, accountHolder, limit)
    }
    this.accounts.push(account)
    return account
  }

  getAccount(agency: number, id: number): Account | undefined {
    for (const account of this.accounts) {
      if (account.agency === agency && account.id === id) {
        return account
      }
    }
    return undefined
  }

  showAccounts(): void {
    console.log(alignText(this.name, ['40']))
    console.log(alignText('RELAÇÃO DE CONTAS', ['40']))
    console.log(alignLine([40]))
    console.log(alignText('AG\tCONTA\tTITULAR', ['<4', '<6', '<28']))
    console.log(alignLine([4, 6, 28]))

    for (const account of this.accounts) {
      const text = `${account.agency}\t${account.id}\t${account.holder}`
      console.log(alignText(text, ['>4', '>6', '<28']))
    }
    console.log(alignLine([40]))
  }
}
