import { bank, Bank } from "./bank"

export class Account {
    private bank: Bank = bank
    private balance: number

    constructor(
        private id: number, 
        private agency: number, 
        private holder: string
    ) {
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
         console.log(this.bank.getName())
         console.log('AG:', this.agency, 'C/C:', this.id)
         console.log('-'.repeat(40))
         console.log('15/03/2025 SALDO   R$', this.balance)
         console.log('-'.repeat(40))
         console.log()
    }
}
