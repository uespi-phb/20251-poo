import { Bank } from "./bank"
import { alignLine, alignText } from "./utils"

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
         console.log(alignText(this.bank.name,['40']))
         console.log(alignText(`AG: ${this.agency}\tC/C: ${this.id}`,['<20', '>19']))
         console.log(alignLine([40]))
         console.log(alignText(`15/03/2025\tSALDO R\$ ${this.balance}`,['<15','>24']))
         console.log(alignLine([40]))
         console.log()
    }
}
