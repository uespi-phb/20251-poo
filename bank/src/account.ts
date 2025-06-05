import { Bank } from './bank'
import { Database } from './database'
import { Transaction, TransactionType } from './transaction'
import {
  alignLine,
  alignText,
  formatCurrency,
  formatDate,
  formatTime,
} from './utils'

export enum AccountType {
  regular,
  special,
}

export type AccountModel = {
  id: number
  type: AccountType
  agency: number
  accountNumber: number
  holder: string
  limit?: number
}

export class Account {
  private _bank?: Bank
  public readonly id: number
  public readonly accountNumber: number
  public readonly agency: number
  public readonly holder: string
  protected balance: number
  private transactions: Transaction[]

  constructor(
    id: number,
    agency: number,
    accountNumber: number,
    holder: string
  ) {
    this._bank = undefined
    this.id = id
    this.agency = agency
    this.accountNumber = accountNumber
    this.holder = holder
    this.transactions = []
    this.balance = 0.0
  }

  get bank(): Bank {
    if (this._bank === undefined)
      throw new Error('Ofphan account. Bank not defined.')
    return this._bank
  }

  set bank(bank: Bank) {
    this._bank = bank
  }

  private checkValue(value: number): void {
    if (value < 0) throw new Error('Invalid value')
  }

  private checkBalance(value: number): void {
    if (value > this.balance) throw new Error('Insufficient funds')
  }

  static loadAccount(bankId: number, accountId: number): Account {
    const sql =
      'select id,agency,number,holder from account where bank_id=$1 and id=$2'
    const account = Database.queryMany(sql, [bankId, accountId])
    if (!account) throw new Error(`Account not found: ${accountId}`)
    return new Account()
  }

  static loadAccounts(bankId: number): Account[] {
    const accounts: Account[] = []
    const sql = 'select id,agency,number,holder from account where bank_id=$1'
    const rows = Database.queryMany(sql, [bankId])

    for (const row of rows) {
      const account = new Account()
    }

    return accounts
  }

  protected addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction)
    this.balance += transaction.signedValue()
  }

  deposit(value: number): void {
    this.checkValue(value)

    const trans = new Transaction(new Date(), TransactionType.deposit, value)
    this.addTransaction(trans)
  }

  withdraw(value: number): void {
    this.checkValue(value)
    this.checkBalance(value)

    const trans = new Transaction(new Date(), TransactionType.widthdraw, value)
    this.addTransaction(trans)
  }

  transfer(value: number, toAccount: Account) {
    this.checkValue(value)
    this.checkBalance(value)

    const debit = new Transaction(new Date(), TransactionType.debit, value)
    this.addTransaction(debit)

    const credit = new Transaction(new Date(), TransactionType.credit, value)
    this.addTransaction(credit)
  }

  protected showHeader(): void {
    const balance = formatCurrency(this.balance)
    const now = new Date()
    const date = formatDate(now)
    const time = formatTime(now)

    console.log(
      alignText(`${date}\t${this.bank.name}\t${time}`, ['<8', '25', '>5'])
    )
    console.log(
      alignText(`AG  : ${this.agency}\tC/C: ${this.accountNumber}`, [
        '<20',
        '>19',
      ])
    )
    console.log(`NOME: ${this.holder}`)
    console.log(alignLine([40]))
  }

  protected showFooter(): void {
    const suffix = this.balance >= 0 ? 'C' : 'D'
    const balance = formatCurrency(this.balance, false, suffix)
    console.log(alignText(`SALDO\t${balance}\n`, ['>27', '>13']))
  }

  showBalance(): void {
    this.showHeader()
    this.showFooter()
  }

  showStatement(): void {
    this.showHeader()
    console.log(alignText('DATA\tOPERACAO\tVALOR', ['<5', '<21', '>12']))
    for (const trans of this.transactions) {
      const date = formatDate(trans.dateTime, false)
      const suffix = trans.isCredit() ? 'C' : 'D'
      const value = formatCurrency(trans.value, false, suffix)
      const line = `${date}\t${trans.description()}\t${value}`
      console.log(alignText(line, ['<5', '<21', '>12']))
    }
    console.log(alignLine([40]))
    this.showFooter()
  }
}
