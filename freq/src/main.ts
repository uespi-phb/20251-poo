import { attendeeCreate, attendeeDelete, attendeeList, attendeeUpdate } from './attendee-crud'
import { Database } from './database'

const dbFilename = './freq.db'

try {
  Database.connect(dbFilename)

  let option = 4
  do {
    console.log('1. Cadastar Participante')
    console.log('2. Alterar  Participante')
    console.log('3. Remover  Participante')
    console.log('4. Listar   Participantes')
    console.log('0. Sair')

    // Read from keyboard

    switch (option) {
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
  } while (false)
} finally {
  if (Database.isConnected()) {
    Database.disconnect()
  }
}
