'use strict'

// IMPORTS
import http from 'http'
import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import bodyParser from 'body-parser'
import ExtensoJs from './app/core'

const app = express()
const setup = {
  path: 'public/',
  port: 3000,
  input: '/:input',
  method: 'GET',
  headers: {
    type: 'application/json'
  },
  banner: '\nExpress server on\n',
  favicon: 'public/favicon.ico'

}

app.set('port', process.env.PORT || setup.port)
app.use(favicon(setup.favicon))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(setup.path)))
app.get(setup.input, (request, response) => {
  const extensoCore = new ExtensoJs(request.params.input)
  if (extensoCore.validation()) {
    response
      .status(200)
      .type(setup.headers.type)
      .json(extensoCore.white())
      .end()
  } else {
    response
      .status(400)
      .type(setup.headers.type)
      .json(extensoCore.invalid)
      .end()
  }
})

const server = http.createServer(app)
server.listen(setup.port, () => {
  console.log(setup.banner)
})
