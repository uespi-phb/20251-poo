export enum TransactionType {
  deposit,
  widthdraw,
  credit,
  debit,
}

export type TransactionModel = {
  type: TransactionType
  dateTime: Date
  value: number
}

export class Transaction {
  public readonly dateTime: Date
  public readonly type: TransactionType
  public readonly value: number

  constructor(dateTime: Date, type: TransactionType, value: number) {
    this.dateTime = dateTime
    this.type = type
    this.value = value
  }

  static fromJSON(model: TransactionModel): Transaction {
    return new Transaction(new Date(model.dateTime), model.type, model.value)
  }

  signedValue(): number {
    let value: number
    switch (this.type) {
      case TransactionType.deposit:
      case TransactionType.credit:
        value = this.value
        break
      case TransactionType.widthdraw:
      case TransactionType.debit:
        value = -this.value
    }
    return value
  }

  isCredit(): boolean {
    return (
      this.type === TransactionType.deposit ||
      this.type === TransactionType.credit
    )
  }

  isDebit(): boolean {
    return !this.isCredit()
  }

  description(): string {
    let desc: string

    switch (this.type) {
      case TransactionType.deposit:
        desc = 'DEPÓSITO'
        break
      case TransactionType.widthdraw:
        desc = 'SAQUE'
        break
      case TransactionType.debit:
        desc = 'TRANSFER/DÉBITO'
        break
      case TransactionType.credit:
        desc = 'TRANSFER/CRÉDITO'
    }

    return desc
  }
}
