
exports.up = function(knex, Promise) {
  return knex.schema.createTable('authors', function(table) {
    table.increments();
    table.string('author_1_first_name');
    table.string('author_1_last_name');
    table.text('author_1_biography');
    table.text('author_1_portrait_url');
    table.string('author_2_first_name');
    table.string('author_2_last_name');
    table.text('author_2_biography');
    table.text('author_2_portrait_url');
    table.string('author_3_first_name');
    table.string('author_3_last_name');
    table.text('author_3_biography');
    table.text('author_3_portrait_url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('authors');
};
