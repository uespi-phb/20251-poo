import { Bank } from './bank'
import { Transaction, TransactionType } from './transaction'
import {
  alignLine,
  alignText,
  formatCurrency,
  formatDate,
  formatTime,
} from './utils'

export class Account {
  public readonly bank: Bank
  public readonly id: number
  public readonly agency: number
  public readonly holder: string
  private transactions: Transaction[]
  protected balance: number

  constructor(bank: Bank, agency: number, id: number, holder: string) {
    this.bank = bank
    this.agency = agency
    this.id = id
    this.holder = holder
    this.transactions = []
    this.balance = 0.0
  }

  private checkValue(value: number): void {
    if (value < 0) throw new Error('Invalid value')
  }

  private checkBalance(value: number): void {
    if (value > this.balance) throw new Error('Insufficient funds')
  }

  deposit(value: number): void {
    this.checkValue(value)

    const trans = new Transaction(new Date(), TransactionType.deposit, value)
    this.transactions.push(trans)

    this.balance += value
  }

  withdraw(value: number): void {
    this.checkValue(value)
    this.checkBalance(value)

    const trans = new Transaction(new Date(), TransactionType.widthdraw, value)
    this.transactions.push(trans)

    this.balance -= value
  }

  transfer(value: number, toAccount: Account) {
    this.checkValue(value)
    this.checkBalance(value)

    const debit = new Transaction(new Date(), TransactionType.debit, value)
    this.transactions.push(debit)
    this.balance -= value

    const credit = new Transaction(new Date(), TransactionType.credit, value)
    toAccount.transactions.push(credit)
    toAccount.balance += value
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
    console.log(alignText(`SALDO\t${balance}`, ['>27', '>12']))
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
