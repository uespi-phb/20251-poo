import { Bank } from './bank'
import { alignLine, alignText, formatCurrency } from './utils'

export class Account {
  public readonly bank: Bank
  public readonly id: number
  public readonly agency: number
  public readonly holder: string
  private balance: number

  constructor(bank: Bank, id: number, agency: number, holder: string) {
    this.bank = bank
    this.id = id
    this.agency = agency
    this.holder = holder
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

    this.balance += value
  }

  withdraw(value: number): void {
    this.checkValue(value)
    this.checkBalance(value)

    this.balance -= value
  }

  transfer(value: number, toAccount: Account) {
    this.checkValue(value)
    this.checkBalance(value)

    this.balance -= value
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
}
