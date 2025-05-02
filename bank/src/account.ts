import { Bank } from './bank'
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
  type: AccountType
  agency: number
  id: number
  holder: string
  balance: number
  transactions: Transaction[]
  limit?: number
}

export class Account {
  private _bank?: Bank
  public readonly id: number
  public readonly agency: number
  public readonly holder: string
  protected balance: number
  private transactions: Transaction[]

  constructor(agency: number, id: number, holder: string) {
    this._bank = undefined
    this.agency = agency
    this.id = id
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

  static fromJSON(model: AccountModel): Account {
    const account = new Account(model.agency, model.id, model.holder)
    for (const trans of model.transactions) {
      account.addTransaction(Transaction.fromJSON(trans))
    }
    return account
  }

  toJSON(): AccountModel {
    return {
      type: AccountType.regular,
      agency: this.agency,
      id: this.id,
      holder: this.holder,
      balance: this.balance,
      transactions: this.transactions,
    }
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
      alignText(`AG  : ${this.agency}\tC/C: ${this.id}`, ['<20', '>19'])
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
