if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env.development' });
}

const { PG_HOST, PG_PORT, PG_USER, PG_PWORD, PG_DB } = process.env;

// node-postgres package ===========================================
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

// module.exports = pool;

// node-postgres package ===========================================

// sequelize package ===========================================
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  `postgres://${PG_USER}:${PG_PWORD}@${PG_HOST}:${PG_PORT}/${PG_DB}`
);
// or
// const sequelize = new Sequelize(PG_DB, PG_USER, PG_PWORD, {
//   host: PG_HOST,
//   dialect: 'postgres',
// });

module.exports = sequelize;
// sequelize package ===========================================
