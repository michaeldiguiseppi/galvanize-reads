
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table) {
    table.increments();
    table.integer('book_id');
    table.foreign('book_id').references('id').inTable('books');
    table.string('first_name');
    table.string('last_name');
    table.text('biography');
    table.text('portrait_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
