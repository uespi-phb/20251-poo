
import sqlite3, { Database } from 'sqlite3'
import fs from 'fs'

function formatQuery(sql: string, params: any[] = []): string {
    let formattedSql = sql
    let paramIndex = 0

    // Substituir cada ? pelo valor correspondente
    formattedSql = formattedSql.replace(/\?/g, () => {
      if (paramIndex >= params.length) {
        return '?'
      }

      const param = params[paramIndex++]
      
      if (param === null || param === undefined) {
        return 'NULL'
      }
      
      if (typeof param === 'string') {
        // Escapar aspas simples para visualização
        return `'${param.replace(/'/g, "''")}'`
      }
      
      if (typeof param === 'boolean') {
        return param ? '1' : '0'
      }
      
      if (param instanceof Date) {
        return `'${param.toISOString()}'`
      }
      
      return String(param)
    })

    return formattedSql
}

function importBanks(db: Database, jsonFile: string) {
    let json = fs.readFileSync(jsonFile).toString()
    const bankData = JSON.parse(json)

    db.run('delete from bank')
    for(const bank of bankData) {
        const sql = 'insert into bank(id,name) values(?,?)'
        db.run(sql,[bank.id, bank.name.toUpperCase()])
    }
    
}

function importAccounts(db: Database, jsonFile: string) {
    let json = fs.readFileSync(jsonFile).toString()
    const accountData = JSON.parse(json)

    db.run('delete from account')
    for(const account of accountData) {
        const sql = 'insert into account(id,agency,holder,bank_id) values(?,?,?,?)'

        console.log(account.holder)
        db.run(sql,[account.id, account.agency, account.holder.toUpperCase(), account.bankId])
    }
}


function importTransactions(db: Database, jsonFile: string) {
    let json = fs.readFileSync(jsonFile).toString()
    const transData = JSON.parse(json)

    db.run('delete from "transaction"')
    for(const data of transData) {
        const sql = 'insert into "transaction"(date,value,type,account_id) values(?,?,?,?);'

        for(const t of data.transactions) {
            const params = [t.dateTime, t.value, t.type, data.accountId]
            console.log(formatQuery(sql,params))
            db.run(sql,params)
        }
    }
}

sqlite3.verbose()
const db = new Database('./bank.db')

//importBanks(db, './data/banks.json')
// importAccounts(db, './data/accounts.json')
importTransactions(db, './data/transactions.json')

db.close()
