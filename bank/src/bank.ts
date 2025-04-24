import { Account } from './account'
import { alignLine, alignText } from './utils'

import fs from 'fs'

export type BankModel = {
  id: number
  name: string
}

export class Bank {
  private static bankFileName = 'bank.json'
  private static accountsFileName = 'accounts.json'

  public readonly id: number
  public readonly name: string
  public readonly accounts: Account[]

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
    this.accounts = []
  }

  toModel(): BankModel {
    return {
      id: this.id,
      name: this.name,
    }
  }

  addAccount(account: Account): void {
    account.bank = this
    this.accounts.push(account)
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

  save(): void {
    const bank = this.toModel()
    fs.writeFileSync(Bank.bankFileName, JSON.stringify(bank))

    const accounts: object[] = []
    for (const account of this.accounts) {
      accounts.push(account.toModel())
    }
    fs.writeFileSync(Bank.accountsFileName, JSON.stringify(accounts))
  }

  static load(): Bank {
    let json = fs.readFileSync(Bank.bankFileName).toString()
    const bankData = JSON.parse(json)
    const bank = new Bank(bankData.id, bankData.name)

    json = fs.readFileSync(Bank.accountsFileName).toString()
    const accountData = JSON.parse(json)
    for (const model of accountData) {
      console.log(model)
      bank.addAccount(Account.fromModel(model))
    }

    return bank
  }
}
