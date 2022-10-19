const knex = require('knex')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.up = async function (knex) {
    const exists = await knex.schema.hasTable('products')
    if (!exists) {
        return knex.schema.createTable('products', (table) => {
            table.increments('id');
            table.integer('timestamp', 50);
            table.string('title').notNullable();
            table.string('description', 350);
            table.integer('stock', 32).notNullable();
            table.integer('price', 32).notNullable();
            table.string('thumbnail').notNullable();
            /* table.integer('code'); */
        });
    };
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = async function (knex) {
    const exists = await knex.schema.hasTable('products')
    if (exists) {
        return knex.schema.dropTable('products')
    }
};
