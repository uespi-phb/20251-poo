import PromptSync from 'prompt-sync'
import { Bank } from './bank'
import { Database } from './database'

function main() {
  const prompt = PromptSync({ sigint: true })
  let option: string

  do {
    console.clear()
    console.log('MENU PRINCIPAL')
    console.log('-'.repeat(20))
    console.log('  1. Listar Bancos')
    console.log('  2. Efetuar Depósito')
    console.log('  3. Efetuar Saque')
    console.log('  0. Sair')

    option = prompt('> ')
    switch (option) {
      case '1':
        listBanks()
        break
      case '2':
        break
      case '3':
        break
    }
  } while (option !== '0')
}

function listBanks() {}

Database.connect()
main()
Database.disconnect()
