import { Bank } from "./bank"

export class Account {
    public readonly bank: Bank
    public readonly id: number
    public readonly agency: number
    public readonly holder: string
    private balance: number

    constructor(
        bank: Bank,
        id: number, 
        agency: number, 
        holder: string
    ) {
        this.bank = bank
        this.id = id
        this.agency = agency
        this.holder = holder
        this.balance = 0.00
    }

    deposit(value: number): void {
        // this.balance = this.balance + value
        this.balance += value
    }

    withdraw(value: number): void {
        this.balance -= value
    }

    transfer(value: number, toAccount: Account) {
        this.balance -= value
        toAccount.balance += value
    }

    showBalance(): void {
         console.log(this.bank.name)
         console.log('AG:', this.agency, 'C/C:', this.id)
         console.log('-'.repeat(40))
         console.log('15/03/2025 SALDO   R$', this.balance)
         console.log('-'.repeat(40))
         console.log()
    }
}
