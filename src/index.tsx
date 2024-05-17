import dotenv from 'dotenv';
import { createServer } from 'node:https'
import fs from 'node:fs'
import { serve } from '@hono/node-server'
import { serveStatic } from 'frog/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { Box, Heading, Text, Rows, Row,Columns,Column, Image, HStack, VStack, vars } from './ui.ts';


export const app = new Frog({

  origin: 'https://frame.cryptodefitracker.com',
  hub: { apiUrl: 'http://localhost:2281' }
})



app.frame('/', (c) => {

  const { buttonValue, inputText, status } = c
  console.log(c)
  const fruit = inputText || buttonValue
  return c.res({
    image: (
      <Box
      backgroundImage="url('https://www.cryptodefitracker.com/static/media/main.011a4cd82ffd7b2a0b2be6f1536b6ae3.svg')"
    >
      <Rows gap="2">
        <Row height="1/8" padding="20">
          <HStack gap="8" grow textAlign="center">
            <Image src="/favicon.ico" width="40" display="flex" />
            <Heading>cryptoDefiTracker.com</Heading>
          </HStack>
        </Row>
        </Rows>
        </Box>
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

serveStatic({ root: './public' })
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