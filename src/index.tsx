import dotenv from 'dotenv';
import { createServer } from 'node:https'
import fs from 'node:fs'
import { serve } from '@hono/node-server'
import { serveStatic } from '@airstack/frog/serve-static'
import { Frog,Button, TextInput  } from "@airstack/frog";
import { devtools } from '@airstack/frog/dev'


export const app = new Frog({
  verify: true,
  apiKey: process.env.AIRSTACK_API_KEY as string
});

app.use('/*', 

serveStatic({ root: './public' }))

app.frame('/', (c) => {

  const { buttonValue, inputText, status } = c
  console.log(c)
  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            ? `Nice choice.${fruit ? ` ${fruit.toUpperCase()}!!` : ''}`
            : 'Welcome!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter custom fruit..." />,
      <Button value="apples">Apples</Button>,
      <Button value="oranges">Oranges</Button>,
      <Button value="bananas">Bananas</Button>,
      status === 'response' && <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

// const cert = fs.readFileSync(process.env.CERT);
// const ca = fs.readFileSync(process.env.CA);
// const key = fs.readFileSync(process.env.KEY);

const port = 10000
// let sslOptions = {
//   cert: cert, // fs.readFileSync('./ssl/example.crt');
//   ca: ca, // fs.readFileSync('./ssl/example.ca-bundle');
//   key: key // fs.readFileSync('./ssl/example.key');
// };
console.log(`Server is running on port ${port}`)

devtools(app, { serveStatic });

serve({
  fetch: app.fetch,
  // createServer: createServer,
  // serverOptions: {
  //   key: key,
  //   cert: cert
  // },
  port:port
})