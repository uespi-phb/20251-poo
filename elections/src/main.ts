import { SQLiteDatabase } from './sqlitedb'

type BallotBoxModel = {
  id: number
  numero: number
  secao: number
  zona: number
  municipio: number
}

const dbName = 'elections-2022-pi.db'
const db = new SQLiteDatabase(dbName)

db.connect()

const rows = db.queryAny<BallotBoxModel>('select id,numero,secao,zona,municipio from urna')

db.transaction(() => {
  for (const row of rows) {
    console.log(`${row.numero} --> ${row.id}`)
    db.queryNone('update votacao set urna=? where urna=? and secao=? and zona=? and municipio=?', [
      row.id,
      row.numero,
      row.secao,
      row.zona,
      row.municipio,
    ])
  }
})

db.disconnect()
