import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('populacao').del();

  await knex('populacao').insert([
    { id: 1, uf: 'SP', populacao: 44639899 },
    { id: 2, uf: 'RJ', populacao: 15989929 },
    { id: 3, uf: 'PE', populacao: 9616621 },
    { id: 4, uf: 'BA', populacao: 14873064 },
  ]);
}
