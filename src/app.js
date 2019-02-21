'use strict';

const express = require(`express`);

// const offerStore = require(`./offers/store`);
// const offersRouter = require(`./offers/router`)(offerStore, imageStore);
// const imageStore = require(`./images/store`);
const { expressErrorHandler, CORSHandler } = require(`./utils/utils`);
const { loginRouterTest }= require('./login/router');

const app = express();

app.use(express.static(`${process.cwd()}/static`));

app.use(CORSHandler);

app.use(`/test`, loginRouterTest);

// app.use(`/api/offers`, offersRouter);

app.use(expressErrorHandler);

module.exports = app;
