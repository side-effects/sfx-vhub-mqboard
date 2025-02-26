const express = require('express');
const { Queue } = require('bullmq');
const { createBullBoard } = require('@bull-board/api');
const { BullMQAdapter } = require('@bull-board/api/bullMQAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const config = require('../config');
const queueNames = config.get('queues');

const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/');

 createBullBoard({
  queues: queueNames.map(n => new BullMQAdapter(new Queue(n, {connection: config.get('connection')}))),
  serverAdapter: serverAdapter,
  options: {
    uiConfig: {
      boardTitle: 'vHUB MQ',
      boardLogo: {
        path: 'https://www.vhub.ch/vhub.png',
        width: '100px',
        height: 200,
      },
      miscLinks: [{text: 'Logout', url: '/logout'}],
      favIcon: {
        default: 'https://www.vhub.ch/vhub.png',
        alternative: 'https://www.vhub.ch/vhub.png',
      },
    },
  }
});

const app = express();
app.use('/', serverAdapter.getRouter());

app.listen(7777, () => {
  console.log('Running on 7777...');
});