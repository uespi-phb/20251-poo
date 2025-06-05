import { Account } from './account'
import { Database } from './database'
import { SpecialAccount } from './special-account'
import { alignLine, alignText } from './utils'

export type BankModel = {
  id: number
  name: string
}

export class Bank {
  public readonly id: number
  public readonly name: string

  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  static fromJSON(model: BankModel): Bank {
    return new Bank(model.id, model.name)
  }

  toJSON(): BankModel {
    return {
      id: this.id,
      name: this.name,
    }
  }

  getAccounts(): Account[] {
    return Account.loadAccounts(this.id)
  }

  getAccount(id: number): Account {
    return Account.loadAccount(this.id, id)
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
    console.log(alignLine([4, 6, 1, 26]))

    for (const account of this.accounts) {
      const type = account instanceof SpecialAccount ? 'E' : 'R'
      const text = `${account.agency}\t${account.id}\t${type}\t${account.holder}`
      console.log(alignText(text, ['>4', '>6', '1', '<26']))
    }
    console.log(alignLine([40]), '\n')
  }

  save(): void {
    // fs.writeFileSync(Bank.bankFileName, JSON.stringify(this))
    // fs.writeFileSync(Bank.accountsFileName, JSON.stringify(this.accounts))
    // const accounts: object[] = []
    // for (const account of this.accounts) {
    //   accounts.push(account.toJSON())
    // }
    // fs.writeFileSync(Bank.accountsFileName, JSON.stringify(this.accounts))
  }

  static load(bankId: number): Bank {
    let sql = 'select id,name from bank where id=$1'
    let bankData = Database.queryOne<BankModel>(sql, [bankId])

    if (!bankData) throw new Error('Bank not found')

    const bank = new Bank(bankData.id, bankData.name)
    bank.accounts.length = 0
    bank.accounts.push(...Account.loadAccounts(bank))

    return bank

    // const bank = new Bank(bankData.id, bankData.name)

    // for (const model of bankData.accounts) {
    //   let account: Account

    //   switch (model.type) {
    //     case 0:
    //       account = Account.fromJSON(model)
    //       break
    //     case 1:
    //       account = SpecialAccount.fromJSON(model)
    //       break
    //     default:
    //       throw new Error(`Invalid account type: ${model.type}`)
    //   }
    //   bank.addAccount(account)
    // }
  }
}
