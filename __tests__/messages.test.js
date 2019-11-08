// @ts-check

import path from 'path';
import buildApp from '../server';

const buildUrl = (url) => path.join('/api/v1/', url);

const stateGlobal = {
  channels: [
    { id: 100, name: 'custom', removable: true },
  ],
  messages: [
    { id: 1, channelId: 100, text: 'hey custom' },
  ],
};

test('get /channels/:id/messages', async () => {
  const app = buildApp(stateGlobal);
  const response = await app.inject({
    url: buildUrl('channels/100/messages'),
  });
  expect(response.statusCode).toEqual(200);
});

test('post /channels/:id/messages', async () => {
  const app = buildApp(stateGlobal);
  const payload = {
    data: {
      attributes: {
        text: 'egegey',
      },
    },
  };
  const response = await app.inject({
    method: 'POST',
    url: buildUrl('channels/100/messages'),
    payload,
  });
  expect(response.statusCode).toEqual(201);

  const expected = {
    data: {
      type: 'messages',
      attributes: {
        body: 'egegey',
      },
    },
  };

  expect(JSON.parse(response.payload)).toMatchObject(expected);
});
