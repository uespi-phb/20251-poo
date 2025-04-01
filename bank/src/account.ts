import { Bank } from './bank'
import { Transaction, TransactionType } from './transaction'
import { alignLine, alignText, formatCurrency } from './utils'

export class Account {
  public readonly bank: Bank
  public readonly id: number
  public readonly agency: number
  public readonly holder: string
  private transactions: Transaction[]
  private balance: number

  constructor(bank: Bank, id: number, agency: number, holder: string) {
    this.bank = bank
    this.id = id
    this.agency = agency
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

  showBalance(): void {
    const balance = formatCurrency(this.balance)

    console.log(alignText(this.bank.name, ['40']))
    console.log(
      alignText(`AG: ${this.agency}\tC/C: ${this.id}`, ['<20', '>19'])
    )
    console.log(alignLine([40]))
    console.log(alignText(`15/03/2025\tSALDO ${balance}`, ['<15', '>24']))
    console.log(alignLine([40]))
    console.log()
  }

  showStatement(): void {
    console.log(alignText(this.bank.name, ['40']))
    console.log(
      alignText(`AG: ${this.agency}\tC/C: ${this.id}`, ['<20', '>19'])
    )
    console.log(alignLine([40]))
    console.log(alignText('DATA\tOPERACAO\tVALOR', ['<5', '<21', '>12']))
    for (const trans of this.transactions) {
      const day = trans.dateTime.getDate()
      const month = trans.dateTime.getMonth() + 1
      const value = formatCurrency(trans.value)
      const line = `${day}/${month}\t${trans.type}\t${value}`
      console.log(alignText(line, ['<5', '<21', '>12']))
    }
  }
}
