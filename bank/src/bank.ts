import { Account } from './account'
import { formatText } from './utils'

export class Bank {
    public readonly id: number
    public readonly name: string
    public readonly accounts: Account[]
    
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
        this.accounts = []
    }

    createAccount(accountId: number, accountAgency: number, accountHolder: string): void {
        const account = new Account(this, accountId, accountAgency, accountHolder)
        this.accounts.push(account)
    }

    showAccounts(): void {
        console.log(this.name)
        console.log('RELAÇÃO DE CONTAS')
        console.log('-'.repeat(40))
        console.log(formatText('AG\tCONTA\tTITULAR', [-5, -7, 28]))
        console.log('---- ------ ----------------------------')

    }
}
