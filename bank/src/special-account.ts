import { Account, AccountModel, AccountType } from './account'
import { alignText, formatCurrency } from './utils'

export class SpecialAccount extends Account {
  public readonly limit: number

  constructor(agency: number, id: number, holder: string, limit: number) {
    super(agency, id, holder)
    this.limit = limit
  }

  static fromModel(model: AccountModel): SpecialAccount {
    return new SpecialAccount(
      model.agency,
      model.id,
      model.holder,
      model.limit ?? 0.0
    )
  }

  protected showFooter(): void {
    const limit = formatCurrency(this.limit, false, 'C')
    const available = formatCurrency(this.balance + this.limit, false, 'C')
    super.showFooter()
    console.log(alignText(`LIMITE\t${limit}`, ['>27', '>12']))
    console.log(alignText(`DISPONÍVEL\t${available}`, ['>27', '>12']))
  }

  toModel(): AccountModel {
    const model1 = {
      bank: this.bank.id,
      agency: this.agency,
      id: this.id,
      holder: this.holder,
      balance: this.balance,
    }

    const model = super.toModel()
    return {
      ...model,
      type: AccountType.special,
      limit: this.limit,
    }
  }
}
