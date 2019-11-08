// @ts-check

import 'regenerator-runtime/runtime';
import path from 'path';
import Pug from 'pug';
import socket from 'socket.io';
import fastify from 'fastify';
import pointOfView from 'point-of-view';
import fastifyStatic from 'fastify-static';
import _ from 'lodash';
import addRoutes from './routes';


const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;

const setUpViews = (app) => {
  app.register(pointOfView, {
    engine: {
      pug: Pug,
    },
    defaultContext: {
      assetPath: (filename) => `/assets/${filename}`,
    },
    templates: path.join(__dirname, 'views'),
  });
};

const setUpStaticAssets = (app) => {
  app.register(fastifyStatic, {
    root: path.resolve(__dirname, '../dist/public'),
    prefix: '/assets',
  });
};

export default (state = {}) => {
  const app = fastify();
  setUpViews(app);
  setUpStaticAssets(app);
  const io = socket(app.server);

  addRoutes(app, io, state);

  return app;
};
