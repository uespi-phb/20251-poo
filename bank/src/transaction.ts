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
}
