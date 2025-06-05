import { SQLiteDatabase } from './sqlitedb'

type RowModel = {
  id: number
  numero: number
  secao: number
  zona: number
  municipio: number
}

const dbName = 'elections-2022-pi.db'
const db = new SQLiteDatabase(dbName)

db.connect()

const rows = db.queryAny('select id,numero,secao,zona,municipio from urna')

for (const row of rows) {
  const data = row as RowModel
  console.log(`${data.numero} --> ${data.id}`)
  db.queryNone('update votacao set urna=? where urna=? and secao=? and zona=? and municipio=?', [
    data.id,
    data.numero,
    data.secao,
    data.zona,
    data.municipio,
  ])
}

db.disconnect()
