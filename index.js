const sequelize = require('./util/database');

const main = async () => {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
};

main();

// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config({ path: './.env.development' });
// }

// const { PG_HOST, PG_PORT, PG_USER, PG_PWORD, PG_DB } = process.env;

// const Pool = require('pg').Pool;

// const pool = new Pool({
//   host: PG_HOST,
//   port: PG_PORT,
//   user: PG_USER,
//   password: PG_PWORD,
//   database: PG_DB,
// });

// // the pool will emit an error on behalf of any idle clients
// // it contains if a backend error or network partition happens
// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// pool
//   .query('SELECT * FROM products ORDER BY id ASC')
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => console.error(err));
