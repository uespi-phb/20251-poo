import BetterSqlite3, { Database as SQLiteDatabase } from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { formatQuery } from './utils'

type Sample = {
  id: number
  name: string
  tall: boolean
}

export default function execQuery(
  db: SQLiteDatabase,
  sql: string,
  params?: unknown[]
) {
  console.log(formatQuery(sql, params))
  if (params) {
    db.prepare(sql).run(params)
  } else {
    db.prepare(sql).run()
  }
}

function clearData(db: SQLiteDatabase) {
  execQuery(db, 'pragma foreign_keys = ON')

  execQuery(db, 'delete from "transaction"')
  execQuery(db, 'delete from "account"')
  execQuery(db, 'delete from "bank"')
  execQuery(db, 'delete from "sqlite_sequence"')
}

function importBanks(db: SQLiteDatabase, jsonFile: string) {
  let json = fs.readFileSync(jsonFile).toString()
  const bankData = JSON.parse(json)

  for (const bank of bankData) {
    const sql = 'insert into bank(id,name) values(?,?)'
    const params = [bank.id, bank.name.toUpperCase()]
    execQuery(db, sql, params)
  }
}

function importAccounts(db: SQLiteDatabase, jsonFile: string) {
  let json = fs.readFileSync(jsonFile).toString()
  const accountData = JSON.parse(json)

  const sql =
    'insert into account(agency,number,holder,bank_id) values(?,?,?,?)'
  for (const account of accountData) {
    let params = [
      account.agency,
      account.number,
      account.holder.toUpperCase(),
      account.bankId,
    ]

    execQuery(db, sql, params)
  }
}

function importTransactions(db: SQLiteDatabase, jsonFile: string) {
  let json = fs.readFileSync(jsonFile).toString()
  const transData = JSON.parse(json)

  const accountQuery = db.prepare('select id from account where number=?')
  const sql =
    'insert into "transaction"(date,value,type,account_id) values(?,?,?,?)'

  for (const data of transData) {
    const { id } = accountQuery.get(data.accountId) as { id: number }
    for (const t of data.transactions) {
      const params = [t.dateTime, t.value, t.type, id]
      execQuery(db, sql, params)
    }
  }
}

const rootDir = path.resolve(__dirname, '..')
const db = new BetterSqlite3(`${rootDir}/bank.db`)

clearData(db)
importBanks(db, `${rootDir}/data/banks.json`)
importAccounts(db, `${rootDir}/data/accounts.json`)
importTransactions(db, `${rootDir}/data/transactions.json`)

db.close()
