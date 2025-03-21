
export class Bank {
    private id: number
    private name: string
    
    constructor(id: number, name: string) {
        this.id = id
        this.name = name
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

export const bank = new Bank(123, 'BANCO EXEMPLO S/A')
