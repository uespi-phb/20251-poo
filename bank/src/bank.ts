import { Account } from './account'
import { SpecialAccount } from './special-account'
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

  toJSON(): BankModel {
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
    console.log(alignText('AG\tCONTA\tT\tTITULAR', ['<4', '<6', '1', '<26']))
    console.log(alignLine([4, 6, 1, 28]))

    for (const account of this.accounts) {
      const type = account instanceof SpecialAccount ? 'E' : 'R'
      const text = `${account.agency}\t${account.id}\t${type}\t${account.holder}`
      console.log(alignText(text, ['>4', '>6', '1', '<26']))
    }
    console.log(alignLine([40]))
  }

  save(): void {
    fs.writeFileSync(Bank.bankFileName, JSON.stringify(this))
    fs.writeFileSync(Bank.accountsFileName, JSON.stringify(this.accounts))

    // const accounts: object[] = []
    // for (const account of this.accounts) {
    //   accounts.push(account.toJSON())
    // }
    // fs.writeFileSync(Bank.accountsFileName, JSON.stringify(this.accounts))
  }

  static load(): Bank {
    let json = fs.readFileSync(Bank.bankFileName).toString()

    // const bankData = JSON.parse(json)
    // const bank = new Bank(bankData.id, bankData.name)
    const bank = JSON.parse(json, (key: string, value: any) => {
      if (key === '') return new Bank(value.id, value.name)
      return value
    })

    json = fs.readFileSync(Bank.accountsFileName).toString()
    const accountData = JSON.parse(json)
    for (const model of accountData) {
      let account: Account

      switch (model.type) {
        case 0:
          account = Account.fromJSON(model)
          break
        case 1:
          account = SpecialAccount.fromJSON(model)
          break
        default:
          throw new Error(`Invalid account type: ${model.type}`)
      }
      bank.addAccount(account)
    }

    return bank
  }
}
