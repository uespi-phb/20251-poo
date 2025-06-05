import { Account, AccountModel, AccountType } from './account'
import { Transaction } from './transaction'
import { alignText, formatCurrency } from './utils'

export class SpecialAccount extends Account {
  public readonly limit: number

  constructor(agency: number, id: number, holder: string, limit: number) {
    super(agency, id, holder)
    this.limit = limit
  }

  protected showFooter(): void {
    const limit = formatCurrency(this.limit, false, 'C')
    const available = formatCurrency(this.balance + this.limit, false, 'C')
    super.showFooter()
    console.log(alignText(`LIMITE\t${limit}`, ['>27', '>12']))
    console.log(alignText(`DISPONÍVEL\t${available}\n`, ['>27', '>13']))
  }

  static fromJSON(model: AccountModel): SpecialAccount {
    const account = new SpecialAccount(
      model.agency,
      model.id,
      model.holder,
      model.limit ?? 0.0
    )

    for (const trans of model.transactions) {
      account.addTransaction(Transaction.fromJSON(trans))
    }

    return account
  }

  toJSON(): AccountModel {
    const model = super.toJSON()
    return {
      ...model,
      type: AccountType.special,
      limit: this.limit,
    }
  }
}
