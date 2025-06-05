
import { Database } from 'better-sqlite3'
import fs from 'fs'
import { formatQuery } from './utils'

function importBanks(db: Database, jsonFile: string) {
    let json = fs.readFileSync(jsonFile).toString()
    const bankData = JSON.parse(json)

    db.run('delete from bank')
    for (const bank of bankData) {
        const sql = 'insert into bank(id,name) values(?,?)'
        db.run(sql, [bank.id, bank.name.toUpperCase()])
    }

}

function importAccounts(db: Database, jsonFile: string) {
    let json = fs.readFileSync(jsonFile).toString()
    const accountData = JSON.parse(json)

    db.run('delete from account')
    for (const account of accountData) {
        const sql = 'insert into account(id,agency,holder,bank_id) values(?,?,?,?)'

        console.log(account.holder)
        db.run(sql, [account.id, account.agency, account.holder.toUpperCase(), account.bankId])
    }
}


function importTransactions(db: Database, jsonFile: string) {
    let json = fs.readFileSync(jsonFile).toString()
    const transData = JSON.parse(json)

    db.run('delete from "transaction"')
    for (const data of transData) {
        const sql = 'insert into "transaction"(date,value,type,account_id) values(?,?,?,?);'

        for (const t of data.transactions) {
            const params = [t.dateTime, t.value, t.type, data.accountId]
            console.log(formatQuery(sql, params))
            db.run(sql, params)
        }
    }
}

const db = new Database('./bank.db')

importBanks(db, './data/banks.json')
importAccounts(db, './data/accounts.json')
importTransactions(db, './data/transactions.json')

db.close()
