import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('populacao', table => {
    table.increments('id').primary();
    table.string('uf').notNullable();
    table.bigInteger('populacao').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('populacao');
}
