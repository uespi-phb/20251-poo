import { Account } from './account'
import { Bank } from './bank'
import { alignText, formatCurrency } from './utils'

export class SpecialAccount extends Account {
  public readonly limit: number

  constructor(
    bank: Bank,
    agency: number,
    id: number,
    holder: string,
    limit: number
  ) {
    super(bank, agency, id, holder)
    this.limit = limit
  }

  protected showFooter(): void {
    const limit = formatCurrency(this.limit, false, 'C')
    const available = formatCurrency(this.balance + this.limit, false, 'C')
    super.showFooter()
    console.log(alignText(`LIMITE\t${limit}`, ['>27', '>12']))
    console.log(alignText(`DISPONÍVEL\t${available}`, ['>27', '>12']))
  }
}
