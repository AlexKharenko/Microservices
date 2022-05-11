const { Pool } = require('pg')
const fastify = require('fastify')({ logger: true })

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

fastify.get('/service1', async (request, reply) => {
  const {rows} = await pool.query('SELECT * FROM BOOK;');
  return rows;
})


fastify.post('/service1/add', async (request, reply) => {
  const data = request.body;
  return pool.query(`insert into book values (default, '${data.title}', '${data.author}', ${data.year}, '${data.description}');`)
})

fastify.put('/service1/update', async (request, reply) => {
  const data = request.body;

  return pool.query(`update book set\
    title = '${data.title}',\
    author = '${data.author}',\
    year = ${data.year},\
    description = '${data.description}' where id = ${data.id};`)
})

fastify.delete('/service1/delete', async (request, reply) => {
  const data = request.body;
  return pool.query(`delete from book where id = ${data.id};`)
})


const start = async () => {
  try {
    await fastify.listen(3000, '0.0.0.0')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

// http://localhost:8001/api/v1/namespaces/default/services/client-service/proxy/hello
