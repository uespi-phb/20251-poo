import { Account } from './account'
import { alignLine, alignText } from './utils'

export class Bank {
    public readonly id: number
    public readonly name: string
    public readonly accounts: Account[]
    
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
        this.accounts = []
    }

    createAccount(agency: number, id: number, accountHolder: string): void {
        const account = new Account(this, id, agency, accountHolder)
        this.accounts.push(account)
    }

    getAccount(agency: number, id: number): Account | undefined {
        for(const account of this.accounts) {
            if(account.agency === agency && account.id === id) {
                return account
            }
        }
        return undefined
    }

    showAccounts(): void {
        console.log(alignText(this.name, ['40']))
        console.log(alignText('RELAÇÃO DE CONTAS',['40']))
        console.log(alignLine([40]))
        console.log(alignText('AG\tCONTA\tTITULAR', ['<4', '<6', '<28']))
        console.log(alignLine([4, 6, 28]))

        for(const account of this.accounts) {
            const text = `${account.agency}\t${account.id}\t${account.holder}`
            console.log(alignText(text, ['>4', '>6', '<28']))
        }
        console.log(alignLine([40]))
    }
}
