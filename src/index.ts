import { Elysia, t } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { apollo, gql } from '@elysiajs/apollo'
import { cron } from '@elysiajs/cron'

const app = new Elysia()

app.use(
  apollo({
    typeDefs: gql`
      type Query {
        getName: String!
      }
    `,
    resolvers: {
      Query: {
        getName() {
          return 'Niraj'
        },
      },
    },
  })
)

app.use(
  cron({
    name: 'log',
    pattern: '*/1 * * * * *',
    run() {
      console.log('Niraj')
    },
  })
)

app
  .use(swagger())
  .post(
    '/login',
    ({ body }) => {
      console.log(`Username: ${body.username} ${body.password}`)
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
