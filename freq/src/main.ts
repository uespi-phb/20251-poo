import readlineSync from 'readline-sync'

import { attendeeCreate, attendeeDelete, attendeeList, attendeeUpdate } from './attendee-crud'
import { Database } from './database'

const dbFilename = './freq.db'

try {
  Database.connect(dbFilename)

  let option: number
  do {
    console.log('\f')
    console.log('MENU PRINCIPAL')
    console.log('--------------')
    console.log('1. Cadastar Participante')
    console.log('2. Alterar  Participante')
    console.log('3. Remover  Participante')
    console.log('4. Listar   Participantes')
    console.log('0. Sair')

    option = parseInt(readlineSync.question('> '))

    switch (option) {
      case 0:
        break
      case 1:
        attendeeCreate()
        break
      case 2:
        attendeeUpdate()
        break
      case 3:
        attendeeDelete()
        break
      case 4:
        attendeeList()
        break
      default:
        console.log('Opção inválida')
    }
  } while (option !== 0)
} finally {
  if (Database.isConnected()) {
    Database.disconnect()
  }
}
