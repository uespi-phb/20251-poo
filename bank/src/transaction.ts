export enum TransactionType {
  deposit,
  widthdraw,
  credit,
  debit,
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
