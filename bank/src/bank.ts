
class Bank {
    private id: number
    private name: string

    constructor(bankId: number, bankName: string) {
        console.log('Bank()')

        this.id = bankId
        this.name = bankName
    }

    // GETTER
    getId(): number {
        return this.id
    }

    // SETTER
    setId(id: number): void {
        if(id > 0) {
            this.id = id;
        }
    }

    // GETTER
    getName(): string {
        return this.name
    }

    // SETTER
    setName(name: string): void {
        this.name = name
    }
}

const b1 = new Bank(990, 'BANCO SIMPLEX S/A')
let b2 = new Bank(995, 'BANCO TOTAL S/A')

b1.setId(104)
b1.setName('CAIXA ECONÔMICA FEDERAL')

console.log('Cod  Banco:', b1.getId())
console.log('Nome Banco:', b1.getName())
