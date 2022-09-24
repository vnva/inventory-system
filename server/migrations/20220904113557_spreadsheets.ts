import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('spreadsheets', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.string('description');
    table.string('unique_column_id');
    table.string('counts_column_id');
    table.boolean('hidden').defaultTo(true);
    table.jsonb('columns');
    table.jsonb('rows');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('spreadsheets');
}
