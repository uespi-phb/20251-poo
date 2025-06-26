import { AttendeeModel } from './attendee'
import { Database } from './database'
import { alignText, readLine } from './utils'

// const attendees: Partial<AttendeeModel>[] = [
//   {
//     cpf: '12987654321',
//     name: 'Ana Silva',
//     phone: '85987654321',
//     email: 'ana.silva123@gmail.com',
//   },
//   {
//     cpf: '98765432109',
//     name: 'Bruno Santos',
//     phone: '11998765432',
//     email: 'bruno.santos456@hotmail.com',
//   },
//   {
//     cpf: '45678912345',
//     name: 'Carlos Oliveira',
//     phone: '21987123456',
//     email: 'carlos.oliveira789@outlook.com',
//   },
//   {
//     cpf: '78912345678',
//     name: 'Diana Souza',
//     phone: '31998876543',
//     email: 'diana.souza321@yahoo.com.br',
//   },
//   {
//     cpf: '32165498721',
//     name: 'Eduardo Rodrigues',
//     phone: '41987654123',
//     email: 'eduardo.rodrigues654@uol.com.br',
//   },
//   {
//     cpf: '65432198765',
//     name: 'Fernanda Ferreira',
//     phone: '51998321456',
//     email: 'fernanda.ferreira987@bol.com.br',
//   },
//   {
//     cpf: '14725836900',
//     name: 'Gabriel Alves',
//     phone: '61987456123',
//     email: 'gabriel.alves147@terra.com.br',
//   },
//   {
//     cpf: '85296374100',
//     name: 'Helena Pereira',
//     phone: '71998654789',
//     email: 'helena.pereira258@gmail.com',
//   },
//   {
//     cpf: '96385274111',
//     name: 'Igor Lima',
//     phone: '81987321654',
//     email: 'igor.lima369@hotmail.com',
//   },
//   {
//     cpf: '74185296322',
//     name: 'Julia Gomes',
//     phone: '91998147258',
//     email: 'julia.gomes741@outlook.com',
//   },
// ]

function writeAttendeeToConsole(attendee: AttendeeModel): void {
  console.log('\nDADOS DO PARTICIPANTE')
  console.log('--------------------')
  console.log('Id     :', attendee.id)
  console.log('Nome   :', attendee.name)
  console.log('CPF    :', attendee.cpf)
  console.log('Email  :', attendee.email)
  console.log('Celular:', attendee.phone)
  console.log()
}

function readAttendeeFromConsole(attendee?: Partial<AttendeeModel>): AttendeeModel {
  console.log('\nDADOS DO PARTICIPANTE')
  console.log('---------------------')
  const name = readLine('Nome   : ', attendee?.name)
  const cpf = readLine('CPF    : ', attendee?.cpf)
  const email = readLine('Email  : ', attendee?.email)
  const phone = readLine('Celular: ', attendee?.phone)

  return {
    name,
    cpf,
    email,
    phone,
  }
}

export function attendeeCreate(): void {
  try {
    const attendee = readAttendeeFromConsole()

    const sql = 'insert into attendee(cpf,name,phone,email) values(?,?,?,?)'
    Database.queryNone(sql, [attendee.cpf, attendee.name, attendee.phone, attendee.email])
  } catch (error) {
    console.log(`Erro ao inserir participante: ${(error as Error).message}`)
  }
}

export function attendeeUpdate(): void {
  console.log('\nALTERAR PARTICIPANTE')
  console.log('--------------------')

  const id = readLine('Id: ')

  let sql = 'select * from attendee where id=?'
  const attendee = Database.queryOne<AttendeeModel>(sql, [id])

  if (!attendee) {
    console.log('Participante não encontrado!')
    return
  }

  writeAttendeeToConsole(attendee)

  const data = readAttendeeFromConsole(attendee)

  sql = 'update attendee set name=?, cpf=?, email=?, phone=? where id=?'
  Database.queryNone(sql, [data.name, data.cpf, data.email, data.phone, id])
}

export function attendeeDelete(): void {
  console.log('\nREMOVER PARTICIPANTE')
  console.log('--------------------')

  const id = readLine('Id: ')

  const sql = 'delete from attendee where id=?'
  Database.queryNone(sql, [id])
}

export function attendeeList(): void {
  const sql = 'select id,cpf,name,email,phone from attendee'
  const data = Database.queryMany<AttendeeModel>(sql)

  const cols = ['>2', '<20', '<33', '<11', '<15']
  console.log(alignText('ID\tNOME\tEMAIL\tCPF\tCELULAR', cols))
  for (const attendee of data) {
    console.log(
      alignText(`${attendee.id}\t${attendee.name}\t${attendee.email}\t${attendee.cpf}\t${attendee.phone}`, cols)
    )
  }
}
