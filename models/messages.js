// @ts-nocheck
const knex = require('knex')

class Messages {

    constructor(tableName, dbConfig) {
        this.table = tableName,
            this.knex = knex(dbConfig)
    }

    createTable = async () => {
        try {
            const tableExist = await this.knex.schema.hasTable(this.table)
            if (!tableExist) {
                await this.knex.schema.createTable(this.table, (table) => {
                    table.increments('id');
                    table.string('username').notNullable();
                    table.string('text', 1000).notNullable();
                    table.string('time', 350).notNullable();
                })
            }

        } catch (error) {
            console.log(error)
        } finally {
            /* this.knex.destroy() */
        }
    }

    async newMessage(message) {
        try {
            await this.knex(this.table).insert(message)
        } catch (error) {
            console.log(error)
        } finally {
            /* this.knex.destroy() */
        }
    }

    async getAll(){
        try {
            const messages = await this.knex.from(this.table).select('*')
            return messages         
          }
          catch (error) {
            console.log(error)
          }
          finally {
           
            /* this.knex.destroy() */
          }
    }

}

module.exports = Messages