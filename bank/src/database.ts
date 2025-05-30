import { Database as SQLiteDatabase } from 'sqlite3'
import fs from 'fs'

export class Database {
    private static db?: SQLiteDatabase

    private constructor() {
    }

    static connect(): void {
        const dbFilename = './bank.db'
        if (Database.db) return

        if (!fs.existsSync(dbFilename)) throw new Error(`Database not found: ${dbFilename}`)
        Database.db = new SQLiteDatabase(dbFilename)
    } 

    static disconnect(): void {
        if(Database.db) {
            Database.db.close()
            Database.db = undefined
        }
    }

     static get query(): SQLiteDatabase {
        if(!Database.db) throw new Error('Database connection not established')
        return Database.db
    }
}
