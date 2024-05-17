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

   hub: ({ apiUrl: 'https://nemes.farcaster.xyz:2281' })
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

        <Row alignItems="center" height="1/10"  alignVertical="center" alignHorizontal="center" >
            <Text color="text200" size="25">
              {status === 'response' ? `Hi, ${name}. Find below Top 5 trending DeFi projects last 48h!` : 'A crypto tracker for trending DeFi Tokens'}
            </Text>
          </Row>





        </Rows>
        </Box>

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
  createServer: createServer,
  // serverOptions: {
  //   key: key,
  //   cert: cert
  // },
  port:port
})