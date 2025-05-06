#!/usr/bin/env node
/**
 * Module dependencies.
 */

/* CONFIG     ----------------------------------------------------------------------------- */
const { ENV } = require("../config");

/* NODEJS     ----------------------------------------------------------------------------- */
const http = require("http");
const { resolve } = require("path");

/* NPM     ----------------------------------------------------------------------------- */
//  設定環境變量
require("dotenv").config({
  path: resolve(
    __dirname,
    `../_config`,
    ENV.isProd ? `./.prod.env` : `./.dev.env`
  ),
});

/* CUSTOM     ----------------------------------------------------------------------------- */
const app = require("../app");

/**
 * Create HTTP server.
 */

let server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */
const port = normalizePort(process.env.NODE_PORT);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "PORT: " + addr.port;
  console.log(`NODE: ${process.version}, MODE: ${ENV.MODE}, ${bind}`);
}
